import React from "react"
import {ToolbarButtonComponent} from "./ToolbarButtonComponent"
import {UnstyledSelectComponent} from "../Unstyled"
import {useDropdownOpenState} from "../../../hooks/Internal/useDropdownOpenState"

export function ToolbarSelectComponent({
	                                       options,
	                                       value,
	                                       onChange,
	                                       buttonTitle,
	                                       showSelectedTitle = true,
	                                       buttonOverwrite,
	                                       buttonComponent = ToolbarButtonComponent,
	                                       buttonProps = {},
	                                       disabled = false,
	                                       onOpen,
                                       }) {
	const [dropdownOpen, _onOpen] = useDropdownOpenState(onOpen)
	return (
		<UnstyledSelectComponent {...{
			options,
			value,
			onChange,
			buttonTitle,
			showSelectedTitle,
			buttonOverwrite,
			buttonComponent,
			disabled,
			onOpen: _onOpen,
			buttonProps: {
				...buttonProps,
				iconRight: typeof buttonProps.iconRight === "undefined" ? {iconName: dropdownOpen ? "mdiMenuUp" : "mdiMenuDown"} : buttonProps.iconRight,
			},
		}} />
	)
}
