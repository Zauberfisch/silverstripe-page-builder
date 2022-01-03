import React from "react"
import {ToolbarButtonComponent} from "./ToolbarButtonComponent"

export function ToolbarButtonPropField({
	                                       elementProp,
	                                       // label,
	                                       buttonTitle,
	                                       buttonProps = {},
	                                       disabled = false,
                                       }) {
	return (
		<span>
			<ToolbarButtonComponent {...{
				...buttonProps,
				children: buttonTitle,
				active: elementProp.value,
				onClick: elementProp.changeHandler,
				disabled,
			}} />
		</span>
	)
}
