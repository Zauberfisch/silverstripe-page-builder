import React from "react"
import {useUniqueId} from "../../../utility"

export function UnstyledTextField({
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
	                                  childrenBefore,
	                                  childrenAfter,
	                                  onChange,
	                                  id,
	                                  type = "text",
	                                  value = "",
	                                  ...props
                                  }) {
	const _id = useUniqueId()
	id = id || _id
	return (
		<span className={containerClassName} style={containerStyle}>
			{title ? <label htmlFor={id} className={labelClassName} style={labelStyle}>{title}</label> : null}
			{childrenBefore}
			<div className={containerInnerClassName} style={containerInnerStyle}>
				<input {...{...props, type, id, disabled, className, style, onChange, value}} />
				{children}
			</div>
			{childrenAfter}
		</span>
	)
}
