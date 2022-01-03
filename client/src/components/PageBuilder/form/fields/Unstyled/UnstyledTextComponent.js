import React from "react"
import {useUniqueId} from "../../../utility"

export function UnstyledTextComponent({
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
		<input {...{...props, type, id: useUniqueId(id), disabled, className, style, onChange, placeholder, value}} />
	)
}

// export function UnstyledTextComponent({
// 	                                  title,
// 	                                  // rightTitle,
// 	                                  disabled = false,
// 	                                  className = "",
// 	                                  labelClassName = "",
// 	                                  containerClassName = "",
// 	                                  containerInnerClassName = "",
// 	                                  style = {},
// 	                                  labelStyle = {},
// 	                                  containerStyle = {},
// 	                                  containerInnerStyle = {},
// 	                                  children,
// 	                                  childrenBefore,
// 	                                  childrenAfter,
// 	                                  onChange,
// 	                                  id,
// 	                                  type = "text",
// 	                                  value = "",
// 	                                  ...props
//                                   }) {
// 	const _id = useUniqueId(id)
// 	return (
// 		<span className={containerClassName} style={containerStyle}>
// 			{title ? <label htmlFor={_id} className={labelClassName} style={labelStyle}>{title}</label> : null}
// 			{childrenBefore}
// 			<div className={containerInnerClassName} style={containerInnerStyle}>
// 				<input {...{...props, type, id: _id, disabled, className, style, onChange, value}} />
// 				{children}
// 			</div>
// 			{childrenAfter}
// 		</span>
// 	)
// }
