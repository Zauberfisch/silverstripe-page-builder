// export function useElementPropString(props, propName) {
// 	const value = props[propName] || ""
// 	const {actions: {setProp}} = useNode()
// 	const changeHandler = React.useCallback(newValue => {
// 		setProp((_props) => {
// 			// eslint-disable-next-line no-param-reassign
// 			_props[propName] = newValue
// 		}, 500)
// 	}, [propName])
// 	const clearHandler = React.useCallback(() => {
// 		setProp((_props) => {
// 			// eslint-disable-next-line no-param-reassign
// 			_props[propName] = ""
// 		})
// 	}, [propName])
// 	return {
// 		value,
// 		changeHandler,
// 		clearHandler,
// 	}
// }


import React from "react"
import {mapListItems, useChangeHandler, useListClearAllHandler, useListItemAddHandler, useListItemChangeHandler, useListItemClearHandler, useListItemMoveHandler} from "./helpers"

const castValue = (value) => value ? `${value}` : ""

export function useElementPropString(props, propName) {
	const value = castValue(props[propName])
	const changeHandler = useChangeHandler(propName, castValue)
	return {
		propName,
		value,
		changeHandler,
	}
}

// export function useElementPropStringList(props, propName) {
// 	const _changeHandler = useListChangeHandler(propName, castValue)
// 	return {
// 		values: mapListItems(props[propName], castValue),
// 		changeHandlers: mapListItems(props[propName], (item, index) => {
// 			return (newValue) => _changeHandler(index, newValue)
// 		}),
// 	}
// }


// export function useElementPropStringList(props, propName) {
// 	const _changeHandler = useListItemChangeHandler(propName, castValue)
// 	// const _clearHandler = useListItemClearHandler(propName, castValue)
// 	// const _moveHandler = useListItemMoveHandler(propName, castValue)
// 	return {
// 		propName,
// 		values: mapListItems(props[propName], castValue),
// 		addHandler: useListItemAddHandler(propName, ""),
// 		clearHandler: useListClearAllHandler(propName),
// 		changeHandlers: mapListItems(props[propName], (item, index) => {
// 			return (newValue) => _changeHandler(index, newValue)
// 		}),
// 		// clearHandlers: mapListItems(props[propName], (item, index) => {
// 		// 	return () => _clearHandler(index)
// 		// }),
// 		// moveUpHandlers: mapListItems(props[propName], (item, index) => {
// 		// 	return () => _moveHandler(index, index - 1)
// 		// }),
// 		// moveDownHandlers: mapListItems(props[propName], (item, index) => {
// 		// 	return () => _moveHandler(index, index + 1)
// 		// }),
// 	}
// }
