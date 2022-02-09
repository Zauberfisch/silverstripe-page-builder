import React from "react"
import {Dropdown, DropdownMenu, DropdownToggle} from "reactstrap"
import {UnstyledButtonComponent} from "./UnstyledButtonComponent"
import {DropdownItem} from "reactstrap"
import classNames from "classnames"

export function UnstyledDropdownComponent({
	                                          buttonOverwrite,
	                                          buttonComponent = UnstyledButtonComponent,
	                                          buttonProps = {},
	                                          disabled = false,
	                                          children,
	                                          onOpen,
                                          }) {
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

export function UnstyledDropdownItemComponent({
	                                              onClick,
	                                              onChange,
	                                              children,
	                                              className = "",
	                                              active = false,
	                                              activeClassName = "",
	                                              style = {},
	                                              value,
	                                              ...props
                                              }) {
	const onMouseDown = React.useCallback((e) => e.preventDefault(), [])
	const _onClick = React.useCallback((e) => {
		e.preventDefault()
		typeof onClick === "function" && onClick(e)
		typeof onChange === "function" && onChange(value, e)
	}, [value])
	return <DropdownItem {...{...props, value, style, className: classNames(className, {[activeClassName]: active}), onMouseDown, onClick: _onClick}}>
		{children}
	</DropdownItem>
}
