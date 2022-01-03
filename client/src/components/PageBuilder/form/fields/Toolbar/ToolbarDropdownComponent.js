import React from "react"
import {ToolbarButtonComponent} from "./ToolbarButtonComponent"
import {UnstyledDropdownComponent} from "../Unstyled"
import {useDropdownOpenState} from "../../../hooks/Internal/useDropdownOpenState"

export function ToolbarDropdownComponent({
	                                         buttonOverwrite,
	                                         buttonComponent = ToolbarButtonComponent,
	                                         buttonProps = {},
	                                         disabled = false,
	                                         children,
	                                         onOpen,
                                         }) {
	const [dropdownOpen, _onOpen] = useDropdownOpenState(onOpen)
	const allProps = {
		buttonOverwrite, buttonComponent, disabled, children, onOpen: _onOpen, buttonProps: {
			iconRight: {iconName: dropdownOpen ? "mdiMenuUp" : "mdiMenuDown"},
			...buttonProps,
			// iconRight: typeof buttonProps.iconRight === "undefined" ? {iconName: dropdownOpen ? "mdiMenuUp" : "mdiMenuDown"} : buttonProps.iconRight,
		},
	}
	return (
		<UnstyledDropdownComponent {...allProps} />
	)
}
