import React from "react"
import {ToolbarButton} from "./ToolbarButton"
import {UnstyledDropdownField} from "../Unstyled"
import {useDropdownOpenState} from "../../../hooks/Internal/useDropdownOpenState"

export function ToolbarDropdownField({
	                                     buttonOverwrite,
	                                     buttonComponent = ToolbarButton,
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
		<UnstyledDropdownField {...allProps} />
	)
}
