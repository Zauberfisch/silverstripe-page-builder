import React from "react"
import {FormFieldGroup} from "./FormFieldGroup"
import {FormSelectComponent} from "./FormSelectComponent"
import {useUniqueId} from "../../../utility"

export function FormSelectPropField({
	                                    elementProp,
	                                    label,
	                                    buttonTitle,
	                                    buttonProps = {},
	                                    showSelectedTitle = true,
	                                    disabled = false,
                                    }) {
	const id = useUniqueId()
	return (
		<FormFieldGroup label={label} labelFor={id}>
			<FormSelectComponent {...{
				options: elementProp.options,
				value: elementProp.value,
				onChange: elementProp.changeHandler,
				buttonTitle,
				buttonProps: {
					...buttonProps,
					id,
				},
				showSelectedTitle,
				disabled,
			}} />
		</FormFieldGroup>
	)
}
