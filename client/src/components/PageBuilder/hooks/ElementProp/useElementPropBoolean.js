import React from "react"
import {mapListItems, useChangeHandler, useListClearAllHandler, useListItemAddHandler, useListItemChangeHandler, useListItemClearHandler, useListItemMoveHandler} from "./helpers"

const castValue = (value) => !!value

export function useElementPropBoolean(props, propName) {
	return {
		propName,
		value: castValue(props[propName]),
		changeHandler: useChangeHandler(propName, castValue),
	}
}

// export function useElementPropBooleanList(props, propName) {
// 	const _changeHandler = useListItemChangeHandler(propName, castValue)
// 	const _clearHandler = useListItemClearHandler(propName, castValue)
// 	const _moveHandler = useListItemMoveHandler(propName, castValue)
// 	return {
// 		values: mapListItems(props[propName], castValue),
// 		addHandler: useListItemAddHandler(propName),
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
