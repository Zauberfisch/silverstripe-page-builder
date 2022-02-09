import React from "react"
import {
	ensureArray,
	mapListItems,
	useChangeHandler,
	useListClearAllHandler,
	useListItemAddHandler,
	useListItemChangeHandler,
	useListItemClearHandler,
	useListItemMoveHandler,
	useListItemRemoveHandler,
} from "./helpers"
import {useElementPropLinkTypes} from "./useElementPropLink"

function callAllInArray(callbacks) {
	for (let callback of callbacks) {
		callback()
	}
}

function normalizeConfig(options) {
	return {
		cast: val => val,
		returnCallback: obj => obj,
		itemCallback: obj => obj,
		hasValue: val => !!val,
		...options,
	}
}


export class ElementPropHelper {
	static useElementProp(props, propName, config) {
		const c = normalizeConfig(config)
		const value = c.cast(props[propName])
		const changeHandler = useChangeHandler(propName, c.cast)
		return c.itemCallback(c.returnCallback({
			propName,
			value,
			changeHandler,
		}))
	}

	static useElementPropList(props, propName, config) {
		const c = normalizeConfig(config)
		const _changeHandler = useListItemChangeHandler(propName, c.cast)
		const _clearHandler = useListItemClearHandler(propName, c.cast(null))
		const _removeHandler = useListItemRemoveHandler(propName)
		const _moveHandler = useListItemMoveHandler(propName)
		const createItemHandler = (value, index) => {
			const _value = c.cast(value)
			return c.itemCallback({
				propName: `${propName}_${index}`,
				value: _value,
				hasValue: !!_value,
				changeHandler: (newValue) => _changeHandler(index, newValue),
				clearHandler: () => _clearHandler(index),
				removeHandler: () => _removeHandler(index),
				moveUpHandler: () => _moveHandler(index, index - 1),
				moveDownHandler: () => _moveHandler(index, index + 1),
			})
		}
		return c.returnCallback({
			propName,
			items: mapListItems(props[propName], createItemHandler),
			createItemHandler,
			addHandler: useListItemAddHandler(propName, ""),
			clearHandler: useListClearAllHandler(propName),
		})
	}

	static useGroupedElementPropLists(elementPropLists) {
		const groups = []
		// const groupValues = []
		const addHandlers = []
		const clearHandlers = []
		let count = 0
		const keys = []
		elementPropLists.forEach(elementProp => {
			count = Math.max(count, elementProp.items.length)
			keys.push(elementProp.propName)
		})
		elementPropLists.forEach(elementProp => {
			if (count > elementProp.items.length) {
				elementProp.addHandler(count - elementProp.items.length)
			}
			addHandlers.push(elementProp.addHandler)
			clearHandlers.push(elementProp.clearHandler)
		})
		for (let i = 0; i < count; i++) {
			const group = {}
			// const _values = {}
			const _clearHandlers = []
			const _removeHandlers = []
			const _moveUpHandlers = []
			const _moveDownHandlers = []
			keys.map((key, j) => {
				// TODO createItemHandler() will create an empty item that is kind of useless and may break if we use useMemo/useCallback. We use it here because otherwise we might have undefined elementProps. This however only matters for the first render, after addHandler() is called it will actually rerender and on the 2nd render the count ob objects will be the same on all lists, so we only create this empty fake item for a render that will be throw away anyway. Maybe we should use "isReady" property on a groupedListProp instead? (so we only show the form fields once the state is correct)
				group[key] = elementPropLists[j].items[i] || elementPropLists[j].createItemHandler(null, i)
				// _values[key] = group[key].value
				_clearHandlers.push(elementPropLists[j].clearHandler)
				_removeHandlers.push(elementPropLists[j].removeHandler)
				_moveUpHandlers.push(elementPropLists[j].moveUpHandler)
				_moveDownHandlers.push(elementPropLists[j].moveDownHandler)
			})
			group.clearHandler = () => callAllInArray(_clearHandlers)
			group.removeHandler = () => callAllInArray(_removeHandlers)
			group.moveUpHandler = () => callAllInArray(_moveUpHandlers)
			group.moveDownHandler = () => callAllInArray(_moveDownHandlers)
			groups.push(group)
			// groupValues.push(_values)
		}
		// TODO use React.useCallback() for addHandler & clearHandler
		return {
			groups,
			// groupValues,
			addHandler: () => callAllInArray(addHandlers),
			clearHandler: () => callAllInArray(clearHandlers),
		}
	}


	static CREATE_TYPE_BOOLEAN() {
		return {cast: value => !!value, hasValue: () => true}
	}

	static CREATE_TYPE_STRING() {
		return {cast: value => value ? `${value}` : ""}
	}

	static CREATE_TYPE_INT() {
		return {cast: value => value && !isNaN(parseInt(value)) ? parseInt(value) : 0}
	}

	static CREATE_TYPE_FLOAT() {
		return {cast: value => value && !isNaN(parseFloat(value)) ? parseFloat(value) : 0.0}
	}

	static CREATE_TYPE_SELECT_STRING(options) {
		// TODO validate that the value is in the options
		const _options = ensureArray(options)
		const {cast: castString} = this.CREATE_TYPE_STRING()
		return {
			cast: castString,
			// returnCallback: (returnValue) => ({
			// 	...returnValue,
			// 	options: _options,
			// }),
			itemCallback: (item) => ({
				...item,
				options: _options,
				fullValue: _options.find(option => option.value === item.value),
			}),
		}
	}

	static CREATE_TYPE_LINK(allowedLinkTypes = ["Internal", "External", "Email", "File"]) {
		const linkTypes = useElementPropLinkTypes(allowedLinkTypes)
		return {
			cast: value => value && typeof value === "object" && allowedLinkTypes.includes(value.linkType) ? value : {},
			// returnCallback: (returnValue) => ({
			// 	...returnValue,
			// allowedLinkTypes,
			// linkTypes,
			// }),
			itemCallback: (item) => ({
				...item,
				hasValue: Object.keys(item.value).length > 0,
				allowedLinkTypes,
				linkTypes,
				// fullValue: _options.find(option => option.value === item.value),
			}),
		}
	}

	static CREATE_TYPE_FILE() {
		return {
			cast: value => value && typeof value === "object" && typeof value.data === "object" && typeof value.file === "object" ? value : {},
			itemCallback: (item) => {
				const hasValue = Object.keys(item.value).length > 0
				return {
					...item,
					hasValue,
					fileName: hasValue ? item.value.data.FileFilename : null,
					url: hasValue ? item.value.file.thumbnail : null,
					// fullValue: _options.find(option => option.value === item.value),
				}
			},
		}
	}

	// TODO review & refactor the helpers. We did a JSON.parse(JSON.stringify()) as a htofix in one place but not in others.
}

