import React from "react"
import {Dropdown, DropdownMenu, DropdownToggle} from "reactstrap"
import {UnstyledButtonComponent} from "./UnstyledButtonComponent"

export function UnstyledDropdownComponent({buttonOverwrite, buttonComponent = UnstyledButtonComponent, buttonProps = {}, disabled = false, children, onOpen}) {
	const [dropdownOpen, _setDropdownOpen] = React.useState(false)
	const setDropdownOpen = React.useCallback((newState) => {
		_setDropdownOpen(newState)
		onOpen && onOpen(newState)
	}, [])
	const toggle = React.useCallback(() => setDropdownOpen(prevState => !prevState), [])
	return (
		<Dropdown isOpen={dropdownOpen} toggle={toggle}>
			<DropdownToggle tag="span">
				{buttonOverwrite || React.createElement(buttonComponent, {
					...buttonProps,
					disabled,
					active: dropdownOpen,
				})}
			</DropdownToggle>
			<DropdownMenu>
				{children}
			</DropdownMenu>
		</Dropdown>
	)
}
