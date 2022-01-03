// import React from "react"
// import styles from "./ToolbarTextField.module.scss"
// import classNames from "classnames"
// import {UnstyledTextField} from "../Unstyled"
//
// export function ToolbarTextField({
// 	                                 title,
// 	                                 // rightTitle,
// 	                                 disabled = false,
// 	                                 className = "",
// 	                                 containerClassName = "",
// 	                                 labelClassName = "",
// 	                                 style = {},
// 	                                 containerStyle = {},
// 	                                 labelStyle = {},
// 	                                 children,
// 	                                 onChange,
// 	                                 id,
// 	                                 type = "text",
// 	                                 value = "",
// 	                                 ...props
//                                  }) {
// 	const allProps = {
// 		// rightTitle,
// 		title, disabled, containerStyle, style, children, onChange, id, type, value, labelStyle,
// 		...props,
// 		containerClassName: classNames(containerClassName, styles.fieldHolder),
// 		labelClassName: classNames(labelClassName, styles.label),
// 		className: classNames(className, styles.field),
// 	}
// 	return (
// 		<UnstyledTextField  {...allProps} />
// 		// <UnstyledButton {...allProps}>
// 		// 	<TitleWithIcon {...{children, iconLeft, iconRight}} />
// 		// </UnstyledButton>
// 	)
// }
