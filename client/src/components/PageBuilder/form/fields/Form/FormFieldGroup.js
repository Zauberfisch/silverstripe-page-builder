import React from "react"

export function FormFieldGroup({label, labelFor, children, className, innerClassName, ...props}) {
	return (
		<div className={`form-group field ${className}`} {...props}>
			{React.Children.count(label) ? <label className="form__field-label" htmlFor={labelFor}>{label}</label> : null}
			<div className={`form__field-holder ${innerClassName}`}>
				{children}
			</div>
		</div>
	)
}
