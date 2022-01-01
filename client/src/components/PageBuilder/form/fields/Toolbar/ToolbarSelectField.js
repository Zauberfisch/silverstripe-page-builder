import React from "react"
import {ToolbarButton} from "./ToolbarButton"
import {UnstyledSelectField} from "../Unstyled"
import {useDropdownOpenState} from "../../../hooks/Internal/useDropdownOpenState"

export function ToolbarSelectField({
	                                   options,
	                                   value,
	                                   onChange,
	                                   buttonTitle,
	                                   showSelectedTitle = true,
	                                   buttonOverwrite,
	                                   buttonComponent = ToolbarButton,
	                                   buttonProps = {},
	                                   disabled = false,
	                                   onOpen,
                                   }) {
	const [dropdownOpen, _onOpen] = useDropdownOpenState(onOpen)
	if (buttonProps.iconRight === undefined) {
		buttonProps.iconRight = {iconName: dropdownOpen ? "mdiMenuUp" : "mdiMenuDown"}
	}
	const allProps = {options, value, onChange, buttonTitle, showSelectedTitle, buttonOverwrite, buttonComponent, buttonProps, disabled, onOpen: _onOpen}
	return <UnstyledSelectField {...allProps} />
}
