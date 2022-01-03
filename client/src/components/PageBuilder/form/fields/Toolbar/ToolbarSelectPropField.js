import React from "react"
import {ToolbarSelectComponent} from "./ToolbarSelectComponent"

export function ToolbarSelectPropField({
	                                       elementProp,
	                                       // label,
	                                       buttonTitle,
	                                       buttonProps = {},
	                                       showSelectedTitle = true,
	                                       disabled = false,
                                       }) {
	return (
		<span>
			<ToolbarSelectComponent {...{
				options: elementProp.options,
				value: elementProp.value,
				onChange: elementProp.changeHandler,
				buttonTitle,
				buttonProps,
				showSelectedTitle,
				disabled,
			}} />
		</span>
	)
}
