import React from "react"
import classNames from "classnames"
import {DropdownItem} from "reactstrap"
import {UnstyledDropdownComponent} from "./UnstyledDropdownComponent"
import {UnstyledButtonComponent} from "./UnstyledButtonComponent"

export function UnstyledSelectComponent({
	                                        options,
	                                        value,
	                                        onChange,
	                                        buttonTitle,
	                                        showSelectedTitle = true,
	                                        buttonOverwrite,
	                                        buttonComponent = UnstyledButtonComponent,
	                                        buttonProps = {},

	                                        disabled = false,
	                                        onOpen,
	                                        ...props
                                        }) {
	const selected = options.find(({value: _value}) => value === _value) || {}
	buttonProps.children = showSelectedTitle && selected.children ? selected.children : buttonTitle
	return (
		<UnstyledDropdownComponent {...{buttonOverwrite, buttonComponent, buttonProps, disabled, onOpen, props}}>
			{options && options.map((option, i) => {
				return <UnstyledSelectItem key={`${i}${option.value}`} {...option} active={option.value === value} onChange={onChange} />
			})}
		</UnstyledDropdownComponent>
	)
}

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
