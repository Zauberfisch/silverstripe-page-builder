import React from "react"
import {UnstyledDropdownComponent, UnstyledDropdownItemComponent} from "./UnstyledDropdownComponent"
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
				return <UnstyledDropdownItemComponent key={`${i}${option.value}`} {...option} active={option.value === value} onChange={onChange} />
			})}
		</UnstyledDropdownComponent>
	)
}
