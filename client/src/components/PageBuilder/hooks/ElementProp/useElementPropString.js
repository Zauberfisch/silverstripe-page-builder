import React from "react"
import {useNode} from "@craftjs/core"

export function useElementPropString(props, propName) {
	const value = props[propName] || ""
	const {actions: {setProp}} = useNode()
	const changeHandler = React.useCallback(e => {
		const val = e.currentTarget.value
		setProp((_props) => {
			// eslint-disable-next-line no-param-reassign
			_props[propName] = val
		}, 500)
	}, [propName])
	const clearHandler = React.useCallback(() => {
		setProp((_props) => {
			// eslint-disable-next-line no-param-reassign
			_props[propName] = ""
		})
	}, [propName])
	return {
		value,
		changeHandler,
		clearHandler,
	}
}

