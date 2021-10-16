import React from "react"
import {PageBuilderContext} from "../../PageBuilderContext"
import {useEditor, useNode} from "@craftjs/core"
import {useNodeState} from "./useNodeState"
// import {SelectorIcon} from "@heroicons/react/solid"

import styles from "./MoveHandle.module.scss"
import {Icon} from "../../utility/Icon"

export function MoveHandle({children}) {
	const {connectors: {drag}} = useNode()
	const {isActive, isMoveable} = useNodeState()
	// const {} = React.useContext(PageBuilderContext);
	// const foo = useNode()
	// console.log(foo)
	if (isActive && isMoveable) {
		return <button ref={drag} className={styles.handle}>
			<Icon iconName="mdiCursorMove" />
			{/*<Icon path={mdiCursorMove} size={1} color="red" />*/}
			{/*<SelectorIcon className={styles.icon} />*/}
		</button>
	}
	return null
}
