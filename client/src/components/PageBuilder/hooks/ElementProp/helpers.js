import {useEditor, useNode} from "@craftjs/core"
import React from "react"

export function ensureArray(value) {
	return value && Array.isArray(value) ? value : []
}

// export function castArrayItems(value, castingCallback) {
// 	return ensureArray(value).map(_value => castingCallback(_value))
// }

export function mapListItems(list, callback) {
	return ensureArray(list).map((item, index) => callback(item, index))
}

export function setProp(nodeHelper, propName, newValue) {
	const {actions} = nodeHelper
	actions.setProp(props => {
		// eslint-disable-next-line no-param-reassign
		props[propName] = newValue
	}, 500)
}

export function setPropListCallback(nodeHelper, propName, callback) {
	const {actions} = nodeHelper
	actions.setProp(props => {
		// eslint-disable-next-line no-param-reassign
		props[propName] = ensureArray(props[propName])
		callback(props[propName])
	}, 500)
}


export function setPropListItem(nodeHelper, propName, index, newValue) {
	const {actions} = nodeHelper
	actions.setProp(props => {
		const v = JSON.parse(JSON.stringify(ensureArray(props[propName])))
		v[index] = newValue
		props[propName] = v
		// eslint-disable-next-line no-param-reassign
		// props[propName][index] = newValue
	}, 500)
}

export function useChangeHandler(propName, castingCallback) {
	const nodeHelper = useNode()
	return React.useCallback(newValue => {
		setProp(nodeHelper, propName, castingCallback(newValue))
	}, [propName])
}

export function useClearHandler(propName, emptyValue) {
	const nodeHelper = useNode()
	return React.useCallback(() => {
		setProp(nodeHelper, propName, emptyValue)
	}, [propName])
}

export function useListClearAllHandler(propName) {
	const nodeHelper = useNode()
	return React.useCallback(() => {
		setProp(nodeHelper, propName, [])
	}, [propName])
}

export function useListItemChangeHandler(propName, castingCallback) {
	const nodeHelper = useNode()
	return React.useCallback((index, newValue) => {
		setPropListItem(nodeHelper, propName, index, castingCallback(newValue))
	}, [propName])
}

export function useListItemClearHandler(propName, emptyValue) {
	const nodeHelper = useNode()
	return React.useCallback((index) => {
		setPropListItem(nodeHelper, propName, index, emptyValue)
	}, [propName])
}


export function useListItemRemoveHandler(propName) {
	const nodeHelper = useNode()
	return React.useCallback((index) => {
		setPropListCallback(nodeHelper, propName, list => {
			list.splice(index, 1)
		})
	}, [propName])
}

export function useListItemAddHandler(propName, emptyValue) {
	const {actions: {setProp}, id} = useNode()
	const {actions: {history: {ignore}}} = useEditor()
	return React.useCallback((amountToAdd = 1, noHistory = false) => {
		const nodeHelper = {
			actions: {
				setProp: noHistory ? (callback, throttle) => ignore().setProp(id, callback) : setProp,
			},
		}
		setPropListCallback(nodeHelper, propName, list => {
			for (let i = 0; i < amountToAdd; i++) {
				// TODO check if we really need the deep clone here, maybe immer.js already handles this
				list.push(JSON.parse(JSON.stringify(emptyValue)))
			}
		})
	}, [propName])
}


export function useListItemMoveHandler(propName) {
	const nodeHelper = useNode()
	return React.useCallback((index, newIndex) => {
		setPropListCallback(nodeHelper, propName, list => {
			if (index >= 0 && index < list.length && newIndex >= 0 && newIndex < list.length) {
				// const newValue = JSON.parse(JSON.stringify(_props[propName]))
				const itemToMove = list.splice(index, 1)[0]
				list.splice(newIndex, 0, itemToMove)
			}
		})
	}, [propName])
}
