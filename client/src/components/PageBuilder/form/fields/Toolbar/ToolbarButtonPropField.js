import React from "react"
import {ToolbarButtonComponent} from "./ToolbarButtonComponent"

export function ToolbarButtonPropField({
	                                       elementProp,
	                                       // label,
	                                       buttonTitle,
	                                       buttonProps = {},
	                                       disabled = false,
                                       }) {
	const onClick = React.useCallback((e) => {
		elementProp.changeHandler(!elementProp.value, e)
	}, [elementProp.propName, elementProp.value])
	return (
		<span>
			<ToolbarButtonComponent {...{
				...buttonProps,
				children: buttonTitle,
				active: elementProp.value,
				onClick: onClick,
				disabled,
			}} />
		</span>
	)
}
