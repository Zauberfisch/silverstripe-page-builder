import React from "react"
import classNames from "classnames"
import {UnstyledTextComponent} from "../Unstyled"

export function FormTextComponent({
	                                  disabled = false,
	                                  className = "",
	                                  style = {},
	                                  // children,
	                                  onChange,
	                                  id,
	                                  type = "text",
	                                  value = "",
	                                  placeholder = "",
	                                  ...props
                                  }) {
	return (
		<UnstyledTextComponent  {...{
			...props,
			disabled,
			className: classNames(className, "text"),
			style,
			onChange,
			id,
			type,
			value,
			placeholder,
		}} />
	)
}

//
// export function FormTextComponent({
// 	                              title,
// 	                              // rightTitle,
// 	                              disabled = false,
// 	                              className = "",
// 	                              labelClassName = "",
// 	                              containerClassName = "",
// 	                              containerInnerClassName = "",
// 	                              style = {},
// 	                              labelStyle = {},
// 	                              containerStyle = {},
// 	                              containerInnerStyle = {},
// 	                              children,
// 	                              onChange,
// 	                              id,
// 	                              type = "text",
// 	                              value = "",
// 	                              ...props
//                               }) {
// 	const allProps = {
// 		// rightTitle,
// 		title, disabled, children, onChange, id, type, value,
// 		style, labelStyle, containerStyle, containerInnerStyle,
// 		...props,
// 		containerClassName: classNames(containerClassName, styles.container, "form-group field text"),
// 		containerInnerClassName: classNames(containerInnerClassName, styles.containerInner, "form__field-holder"),
// 		labelClassName: classNames(labelClassName, styles.label, "form__field-label"),
// 		className: classNames(className, styles.field, "text"),
// 	}
// 	return (
// 		<UnstyledTextComponent  {...allProps} />
// 	)
// }

