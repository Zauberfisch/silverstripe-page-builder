import React from "react"
import {Dropdown, DropdownMenu, DropdownToggle} from "reactstrap"
import {UnstyledButton} from "./UnstyledButton"

export function UnstyledDropdownField({buttonOverwrite, buttonComponent = UnstyledButton, buttonProps = {}, disabled = false, children, onOpen}) {
	const [dropdownOpen, _setDropdownOpen] = React.useState(false)
	const setDropdownOpen = React.useCallback((newState) => {
		_setDropdownOpen(newState)
		onOpen && onOpen(newState)
	}, [])
	const toggle = React.useCallback(() => setDropdownOpen(prevState => !prevState), [])
	buttonProps.disabled = disabled
	buttonProps.active = dropdownOpen
	return (
		<Dropdown isOpen={dropdownOpen} toggle={toggle}>
			<DropdownToggle tag="span">
				{buttonOverwrite || React.createElement(buttonComponent, buttonProps)}
			</DropdownToggle>
			<DropdownMenu>
				{children}
			</DropdownMenu>
		</Dropdown>
	)
}
