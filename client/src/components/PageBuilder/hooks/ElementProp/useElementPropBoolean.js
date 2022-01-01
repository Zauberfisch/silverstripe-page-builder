import React from "react"
import {useNode} from "@craftjs/core"

export function useElementPropBoolean(props, propName) {
	const value = !!props[propName]
	const {actions: {setProp}} = useNode()
	const changeHandler = React.useCallback(e => {
		setProp((_props) => {
			// eslint-disable-next-line no-param-reassign
			_props[propName] = !_props[propName]
		})
	}, [propName])
	return {
		value: !!value,
		changeHandler,
	}
}
