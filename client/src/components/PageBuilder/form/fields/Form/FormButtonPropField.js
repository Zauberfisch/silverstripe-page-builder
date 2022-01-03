import React from "react"
import {FormButtonComponent} from "./FormButtonComponent"
import {FormFieldGroup} from "./FormFieldGroup"
import {useUniqueId} from "../../../utility"

export function FormButtonPropField({
	                                    elementProp,
	                                    label,
	                                    buttonTitle,
	                                    buttonProps = {},
	                                    disabled = false,
}) {
	const id = useUniqueId()
	return (
		<FormFieldGroup label={label} labelFor={id}>
			<FormButtonComponent {...{
				...buttonProps,
				id,
				children: buttonTitle,
				active: elementProp.value,
				onClick: elementProp.changeHandler,
				disabled,
			}} />
		</FormFieldGroup>
	)
}
