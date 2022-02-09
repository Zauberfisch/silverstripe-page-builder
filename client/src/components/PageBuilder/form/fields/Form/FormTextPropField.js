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
	const onChange = React.useCallback((e) => {
		elementProp.changeHandler(e.currentTarget.value, e)
	}, [elementProp.propName])
	return (
		<FormFieldGroup label={label} labelFor={id} className={"text"}>
			<FormTextComponent  {...{
				...inputProps,
				id,
				onChange,
				value: elementProp.value,
				disabled,
			}} />
		</FormFieldGroup>
	)
}

