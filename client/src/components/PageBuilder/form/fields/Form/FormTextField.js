import React from "react"
import styles from "./FormTextField.module.scss"
import classNames from "classnames"
import {UnstyledTextField} from "../Unstyled"

export function FormTextField({
	                              title,
	                              // rightTitle,
	                              disabled = false,
	                              className = "",
	                              labelClassName = "",
	                              containerClassName = "",
	                              containerInnerClassName = "",
	                              style = {},
	                              labelStyle = {},
	                              containerStyle = {},
	                              containerInnerStyle = {},
	                              children,
	                              onChange,
	                              id,
	                              type = "text",
	                              value = "",
	                              ...props
                              }) {
	const allProps = {
		// rightTitle,
		title, disabled, children, onChange, id, type, value,
		style, labelStyle, containerStyle, containerInnerStyle,
		...props,
		containerClassName: classNames(containerClassName, styles.container, "form-group field text"),
		containerInnerClassName: classNames(containerInnerClassName, styles.containerInner, "form__field-holder"),
		labelClassName: classNames(labelClassName, styles.label, "form__field-label"),
		className: classNames(className, styles.field, "text"),
	}
	return (
		<UnstyledTextField  {...allProps} />
		// <UnstyledButton {...allProps}>
		// 	<TitleWithIcon {...{children, iconLeft, iconRight}} />
		// </UnstyledButton>
	)
}
