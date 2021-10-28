import React from "react"
import {FieldHolder} from "./FieldHolder"

export function TextField({textProp: {value, onChange}, placeholder, editable = true}) {
	return (
		<FieldHolder>
			<input placeholder={placeholder} type="text" value={value} onChange={onChange} className="text" disabled={!editable} />
		</FieldHolder>
	)
}
