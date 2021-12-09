import React from "react"
import {useNode} from "@craftjs/core"

export function useElementPropText(propName, value) {
	const {actions: {setProp}} = useNode()
	const onChange = React.useCallback(e => {
		const val = e.target.value
		setProp((_props) => {
			_props[propName] = val
		}, 500)
	}, [propName])
	return {
		value,
		changeHandler: onChange,
	}
}
