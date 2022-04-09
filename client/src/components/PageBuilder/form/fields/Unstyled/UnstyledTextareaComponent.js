import React from "react"
import {useUniqueId} from "../../../utility"

export function UnstyledTextareaComponent({
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
		<textarea {...{...props, id: useUniqueId(id), disabled, className, style, onChange, placeholder, value}} />
	)
}
