import React from "react"
import {PageBuilderContext} from "../../PageBuilderContext"
import {useNodeState} from "./useNodeState"
import ReactDOM from "react-dom"
import styles from "../Toolbar/Toolbar.module.scss"

export function ToolbarPortalRow({children}) {
	const {isActive} = useNodeState()
	const {refToolbarRows} = React.useContext(PageBuilderContext)
	if (isActive && refToolbarRows && refToolbarRows.current) {
		return ReactDOM.createPortal(<div className={styles.toolbarRow}>
			{children}
		</div>, refToolbarRows.current)
	}
	return null
}