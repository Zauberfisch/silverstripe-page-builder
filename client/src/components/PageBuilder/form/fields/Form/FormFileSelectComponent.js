import React from "react"
import {FormTextComponent} from "./FormTextComponent"
import {FormFieldGroup} from "./FormFieldGroup"
import {UnstyledFileSelectComponent} from "../Unstyled"
import {FormButtonComponent} from "./FormButtonComponent"

export function FormFileSelectComponent({
	                                  buttonTitle,
	                                  // rightTitle,
	                                  buttonComponent = FormButtonComponent,
	                                  buttonProps = {},
	                                  disabled = false,
	                                  // children,
	                                  onChange,
	                                  value,
                                  }) {
	return (
		<UnstyledFileSelectComponent {...{
			buttonComponent,
			buttonTitle,
			buttonProps,
			disabled,
			onChange,
			value,
		}} />
	)
}
