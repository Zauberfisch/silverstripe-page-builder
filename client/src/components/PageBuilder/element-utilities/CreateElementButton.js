import React from "react"
import {useEditor} from "@craftjs/core"
import {Icon} from "components/PageBuilder/utility"
import styles from "./CreateElementButton.module.scss"

export const CreateElementButton = ({element, iconName, title = "", onCreate, onDragStart}) => {
	const {connectors} = useEditor()
	return <div onDragStart={onDragStart} className={styles.button} ref={(ref) => connectors.create(ref, element, {onCreate})}>
		<Icon className={styles.icon} {...{iconName}} />
		<span className={styles.title}>{title}</span>
	</div>
}

