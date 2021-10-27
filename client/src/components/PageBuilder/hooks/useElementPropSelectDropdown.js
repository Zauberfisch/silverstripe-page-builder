import React from "react"
import {useNode} from "@craftjs/core"
import {ToolbarSelect} from "../Toolbar"

export function useElementPropSelectDropdown(propName, value, options, buttonProps) {
	const {actions: {setProp}} = useNode()
	const onChange = React.useCallback((newValue) => {
		if (value !== newValue) {
			setProp((_props) => {
				// eslint-disable-next-line no-param-reassign
				_props[propName] = newValue
			})
		}
	}, [value])
	return {
		value: options.find(obj => obj.value === value) || {pageBuilderStyle: {}},
		button: <ToolbarSelect {...{...buttonProps, value, onChange, options}} />,
	}
}
