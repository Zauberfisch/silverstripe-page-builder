import React from "react"
import {useNode} from "@craftjs/core"
import {ToolbarButton} from "../form"

export function useElementPropToggleButton(propName, value, buttonProps) {
	const {actions: {setProp}} = useNode()
	const onClick = React.useCallback(e => {
		setProp((_props) => {
			// eslint-disable-next-line no-param-reassign
			_props[propName] = !_props[propName]
		})
	}, [propName])
	return {
		value,
		button: <ToolbarButton {...{...buttonProps, active: !!value, onClick}} />,
		changeHandler: onClick,
	}
}
