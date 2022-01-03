import React from "react"
import {FormButtonComponent} from "./FormButtonComponent"
import {UnstyledDropdownComponent} from "../Unstyled"
import {useDropdownOpenState} from "../../../hooks/Internal/useDropdownOpenState"

export function FormDropdownComponent({
	                                      buttonOverwrite,
	                                      buttonComponent = FormButtonComponent,
	                                      buttonProps = {},
	                                      disabled = false,
	                                      children,
	                                      onOpen,
                                      }) {
	const [dropdownOpen, _onOpen] = useDropdownOpenState(onOpen)
	const allProps = {
		buttonOverwrite, buttonComponent, disabled, children, onOpen: _onOpen, buttonProps: {
			...buttonProps,
			iconRight: typeof buttonProps.iconRight === "undefined" ? buttonProps.iconRight : {iconName: dropdownOpen ? "mdiMenuUp" : "mdiMenuDown"},
		},
	}
	return (
		<UnstyledDropdownComponent {...allProps} />
	)
}
