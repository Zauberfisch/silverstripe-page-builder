import React from "react"
import {useEditor} from "@craftjs/core"
import {Icon} from "../utility/Icon"
import styles from "./CreateElementButton.module.scss"

export const CreateElementButton = ({element, iconName, title = "", onCreate, onDragStart}) => {
	const {connectors} = useEditor()
	if (!title && element.type && typeof element.type.getTypeDisplayName === "function") {
		title = element.type.getTypeDisplayName()
	}
	return <button className={styles.button} ref={(ref) => connectors.create(ref, element, {onCreate})} onDragStart={onDragStart}>
		<Icon className={styles.icon} {...{iconName}} />
		<span className={styles.title}>{title}</span>
	</button>
}
