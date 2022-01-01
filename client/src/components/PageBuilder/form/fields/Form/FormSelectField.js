import React from "react"
import {FormButton} from "./FormButton"
import {UnstyledSelectField} from "../Unstyled"
import {FormFieldGroup} from "./FormFieldGroup"
import {useDropdownOpenState} from "../../../hooks/Internal/useDropdownOpenState"

export function FormSelectField({
	                                options,
	                                value,
	                                onChange,
	                                buttonTitle,
	                                showSelectedTitle = true,
	                                buttonOverwrite,
	                                buttonComponent = FormButton,
	                                buttonProps = {},
	                                disabled = false,
	                                onOpen,
                                }) {
	const [dropdownOpen, _onOpen] = useDropdownOpenState(onOpen)
	if (buttonProps.iconRight === undefined) {
		buttonProps.iconRight = {iconName: dropdownOpen ? "mdiMenuUp" : "mdiMenuDown"}
	}
	const allProps = {options, value, onChange, buttonTitle, showSelectedTitle, buttonOverwrite, buttonComponent, buttonProps, disabled, onOpen: _onOpen}
	return (
		<FormFieldGroup>
			<UnstyledSelectField {...allProps} />
		</FormFieldGroup>
	)
}
