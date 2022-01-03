import React from "react"
import {FormTextComponent} from "./FormTextComponent"
import {FormFieldGroup} from "./FormFieldGroup"

export function FormFileField({
	                              title,
	                              // rightTitle,
	                              disabled = false,
	                              className = "",
	                              labelClassName = "",
	                              containerClassName = "",
	                              containerInnerClassName = "",
	                              style = {},
	                              labelStyle = {},
	                              containerStyle = {},
	                              containerInnerStyle = {},
	                              children,
	                              onChange,
	                              id,
	                              type = "text",
	                              value = "",
	                              ...props
                              }) {
	return (
		<FormFieldGroup>
			<FormTextComponent  {...{
				title,
				disabled,
				className,
				labelClassName,
				containerClassName,
				containerInnerClassName,
				style,
				labelStyle,
				containerStyle,
				containerInnerStyle,
				children,
				onChange,
				id,
				type,
				value,
				...props,
			}} />
		</FormFieldGroup>
	)
}
