import React from "react"
import classNames from "classnames"
import {UnstyledTextareaComponent} from "../Unstyled"

export function FormTextareaComponent({
	                                  disabled = false,
	                                  className = "",
	                                  style = {},
	                                  // children,
	                                  onChange,
	                                  id,
	                                  value = "",
	                                  placeholder = "",
	                                  ...props
                                  }) {
	return (
		<UnstyledTextareaComponent  {...{
			...props,
			disabled,
			className: classNames(className, "text"),
			style,
			onChange,
			id,
			value,
			placeholder,
		}} />
	)
}


