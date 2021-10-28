import React from "react"
import {FieldHolder} from "./FieldHolder"
import styles from "./ButtonField.module.scss"

export function ButtonField({placeholder, linkProp: {addButton, removeButton}, textProp: {value, onChange}, editable = true}) {
	return (
		<FieldHolder style={{display: "flex"}} className={styles.fieldHolder}>
			<input placeholder={placeholder} type="text" value={value} onChange={onChange} className="text" disabled={!editable} />
			<div className={styles.buttons}>
				{editable && addButton}
				{editable && removeButton}
			</div>
		</FieldHolder>
	)
}
