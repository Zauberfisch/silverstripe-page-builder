import React from "react"
import {FieldHolder} from "./FieldHolder"

export function TextAreaField({textProp: {value, onChange}, placeholder, editable = true}) {
	return (
		<FieldHolder>
			<textarea placeholder={placeholder} value={value} onChange={onChange} className="text" disabled={!editable} />
		</FieldHolder>
	)
}
