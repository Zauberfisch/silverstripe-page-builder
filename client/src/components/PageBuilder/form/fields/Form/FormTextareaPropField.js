import React from "react"
import {FormTextareaComponent} from "./FormTextareaComponent"
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
			<FormTextareaComponent  {...{
				...inputProps,
				id,
				onChange,
				value: elementProp.value,
				disabled,
			}} />
		</FormFieldGroup>
	)
}

