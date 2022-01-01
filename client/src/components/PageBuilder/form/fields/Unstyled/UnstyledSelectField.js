import React from "react"
import classNames from "classnames"
import {DropdownItem} from "reactstrap"
import {UnstyledDropdownField} from "./UnstyledDropdownField"
import {UnstyledButton} from "./UnstyledButton"

export function UnstyledSelectItem({
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
		onChange(e, value)
	}, [value])
	return <DropdownItem {...{...props, value, style, className: classNames(className, {[activeClassName]: active}), onMouseDown, onClick: _onClick}}>
		{children}
	</DropdownItem>
}

export function UnstyledSelectField({
	                                    options,
	                                    value,
	                                    onChange,
	                                    buttonTitle,
	                                    showSelectedTitle = true,
	                                    buttonOverwrite,
	                                    buttonComponent = UnstyledButton,
	                                    buttonProps = {},
	
	                                    disabled = false,
	                                    onOpen,
	                                    ...props
                                    }) {
	const selected = options.find(({value: _value}) => value === _value) || {}
	buttonProps.children = showSelectedTitle && selected.children ? selected.children : buttonTitle
	return (
		<UnstyledDropdownField {...{buttonOverwrite, buttonComponent, buttonProps, disabled, onOpen, props}}>
			{options && options.map(option => {
				return <UnstyledSelectItem {...option} active={option.value === value} onChange={onChange} />
			})}
		</UnstyledDropdownField>
	)
}
