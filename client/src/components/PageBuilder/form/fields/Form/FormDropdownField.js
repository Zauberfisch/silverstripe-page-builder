import React from "react"
import {FormButton} from "./FormButton"
import {UnstyledDropdownField} from "../Unstyled"
import {FormFieldGroup} from "./FormFieldGroup"
import {useDropdownOpenState} from "../../../hooks/Internal/useDropdownOpenState"

export function FormDropdownField({
	                                  buttonOverwrite,
	                                  buttonComponent = FormButton,
	                                  buttonProps = {},
	                                  disabled = false,
	                                  children,
	                                  onOpen,
                                  }) {
	const [dropdownOpen, _onOpen] = useDropdownOpenState(onOpen)
	if (buttonProps.iconRight === undefined) {
		buttonProps.iconRight = {iconName: dropdownOpen ? "mdiMenuUp" : "mdiMenuDown"}
	}
	const allProps = {buttonOverwrite, buttonComponent, buttonProps, disabled, children, onOpen: _onOpen}
	return (
		<FormFieldGroup>
			<UnstyledDropdownField {...allProps} />
		</FormFieldGroup>
	)
}
