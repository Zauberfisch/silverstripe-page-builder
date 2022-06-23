import React from "react"
import {FormFileSelectComponent} from "./FormFileSelectComponent"
import {FormFieldGroup} from "./FormFieldGroup"
import {useUniqueId} from "../../../utility"
import {FormTextComponent} from "./FormTextComponent"
import {FormButtonComponent} from "./FormButtonComponent"

export function FormFilePropField({
	                                  elementProp,
	                                  label,
	                                  disabled = false,
	                                  maxFiles = 1,
	                                  multi = false,
	                                  parentId = 0,
                                  }) {
	// FIXME canEditAsText
	const id = useUniqueId()
	return (
		<FormFieldGroup label={label} labelFor={id} className={"fieldgroup"} innerClassName={"form__fieldgroup"}>
					<FormFileSelectComponent
						id={id}
						onChange={elementProp.changeHandler}
						value={elementProp.value}
						disabled={disabled}
						maxFiles={maxFiles}
						multi={multi}
						parentId={parentId}
					/>
		</FormFieldGroup>
	)
}
