import React from "react"
import {useNode} from "@craftjs/core"
import {useElementPropLinkInsertCallback} from "./useElementPropLink"
import {ToolbarButton} from "../form"

export function useElementPropList(propName, value, defaultItem) {
	const {actions: {setProp}} = useNode()
	const clearHandler = React.useCallback(() => {
		setProp((_props) => {
			// eslint-disable-next-line no-param-reassign
			_props[propName] = []
		})
	}, [propName])
	const removeHandler = React.useCallback(() => {
		const index = e.target.dataset.itemindex
		setProp((_props) => {
			// eslint-disable-next-line no-param-reassign
			const newValue = JSON.parse(JSON.stringify(_props[propName]))
			newValue.splice(index, 1)
			_props[propName] = newValue
		})
	}, [propName])
	const addHandler = React.useCallback(() => {
		setProp((_props) => {
			// eslint-disable-next-line no-param-reassign
			let newValue = []
			if (_props[propName] && Array.isArray(_props[propName])) {
				newValue = JSON.parse(JSON.stringify(_props[propName]))
			}
			newValue.push(JSON.parse(JSON.stringify(defaultItem)))
			_props[propName] = newValue
		})
	}, [propName])
	const hasValue = value && Array.isArray(value) && value.length
	const _value = hasValue ? value : []
	return {
		value: _value,
		hasValue,
		addHandler,
		clearHandler,
		removeHandler,
		withAddHandler: (Component) => {
			return ({...props}) => <Component {...props} onClick={addHandler}/>
		},
		withClearHandler: (Component) => {
			return ({...props}) => <Component {...props} onClick={clearHandler}/>
		},
		withRemoveHandler: (Component, index) => {
			return ({...props}) => <Component {...props} onClick={removeHandler} data-itemindex={index} disabled={!hasValue} />
		},
		// addButton: <ToolbarButton iconName="mdiPlaylistPlus" onClick={addHandler} />,
		// clearButton: <ToolbarButton iconName="mdiPlaylistRemove" onClick={clearHandler} />,
		//mdiPlaylistMinus
	}
}
