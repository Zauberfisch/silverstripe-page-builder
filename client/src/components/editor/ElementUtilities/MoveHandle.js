import React from "react"
import {useNode} from "@craftjs/core"
import {useNodeState} from "./useNodeState"
import styles from "./MoveHandle.module.scss"
import {Icon} from "../../utility"

export function MoveHandle() {
	const {connectors: {drag}} = useNode()
	const {isActive, isMoveable} = useNodeState()
	if (isActive && isMoveable) {
		return <div ref={drag} className={styles.handle}>
			<Icon iconName="mdiCursorMove" className={styles.icon} />
		</div>
	}
	return null
}
