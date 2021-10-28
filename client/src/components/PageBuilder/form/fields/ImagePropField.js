import React from "react"
import styles from "./ImagePropField.module.scss"
import {FieldHolder} from "./FieldHolder"

export function ImagePropField({label = "", imageProp: {url, addButton, removeButton}, linkProp, backgroundSize = "contain", editable = true}) {
	return (
		<FieldHolder className={styles.container}>
			<div>
				<div className={styles.image} style={{backgroundImage: url && `url('${url}')`, backgroundSize}} />
			</div>
			{editable && <div className={styles.control}>
				<div className={styles.label}>{label}</div>
				{linkProp && <div>{linkProp.addButton}</div>}
				{linkProp && <div>{linkProp.removeButton}</div>}
				<div>{addButton}</div>
				<div>{removeButton}</div>
			</div>}
		</FieldHolder>
	)
}