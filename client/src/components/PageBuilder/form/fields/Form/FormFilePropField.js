import React from "react"
import {FormFileSelectComponent} from "./FormFileSelectComponent"
import {FormFieldGroup} from "./FormFieldGroup"
import {useUniqueId} from "../../../utility"
import {FormTextComponent} from "./FormTextComponent"
import {FormButtonComponent} from "./FormButtonComponent"

export function FormFilePropField({
	                                  elementProp,
	                                  label,
	                                  buttonTitle,
	                                  buttonProps = {},
	                                  disabled = false,
                                  }) {
	const id = useUniqueId()
	return (
		<FormFieldGroup label={label} labelFor={id} className={"fieldgroup"} innerClassName={"form__fieldgroup"}>
			<div className="input-group">
				<FormTextComponent value={elementProp.fileName || ""} disabled={true} />
				<span className="input-group-append">
					<FormFileSelectComponent  {...{
						...buttonProps,
						buttonTitle,
						id,
						onChange: elementProp.changeHandler,
						value: elementProp.value,
						disabled,
					}} />
				</span>
				{elementProp.fileName ? <span className="input-group-append">
					<FormButtonComponent children={"Remove"} onClick={elementProp.clearHandler} />
				</span> : null}
			</div>
		</FormFieldGroup>
	)
}
