import React from "react"
import {FormTextComponent} from "./FormTextComponent"
import {FormFieldGroup} from "./FormFieldGroup"
import {useUniqueId} from "../../../utility"

export function FormTextPropField({
	                                  elementProp,
	                                  label,
	                                  disabled = false,
	                                  inputProps = {},
	                                  // type = "text",
	                                  // ...props
                                  }) {
	const id = useUniqueId()
	return (
		<FormFieldGroup label={label} labelFor={id} className={"text"}>
			<FormTextComponent  {...{
				...inputProps,
				id,
				onChange: elementProp.changeHandler,
				value: elementProp.value,
				disabled,
			}} />
		</FormFieldGroup>
	)
}
