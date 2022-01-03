import React from "react"
import {FormButtonComponent} from "./FormButtonComponent"
import {UnstyledSelectComponent} from "../Unstyled"
import {useDropdownOpenState} from "../../../hooks/Internal/useDropdownOpenState"

export function FormSelectComponent({
	                                    options,
	                                    value,
	                                    onChange,
	                                    buttonTitle,
	                                    showSelectedTitle = true,
	                                    buttonOverwrite,
	                                    buttonComponent = FormButtonComponent,
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
