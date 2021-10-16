import React from "react"
import {PageBuilderContext} from "../../PageBuilderContext"
import {useNodeState} from "./useNodeState"
import ReactDOM from "react-dom"
import {useEditor} from "@craftjs/core"
import {ToolbarButton} from "../Toolbar/ToolbarButton"
import {ToolbarSeparator} from "../Toolbar/ToolbarSeparator"

export function ToolbarPortalTop({children, childrenRight}) {
	const {actions} = useEditor()
	const {isActive, isDeletable, id, displayName} = useNodeState()
	const {refToolbarTop} = React.useContext(PageBuilderContext)
	if (isActive && refToolbarTop && refToolbarTop.current) {
		return ReactDOM.createPortal(<React.Fragment>
			{children && <React.Fragment>
				<ToolbarSeparator />
				{children}
			</React.Fragment>}
			<div style={{flexGrow: 999}} />
			<div style={{paddingRight: 5}}><span>{displayName}</span></div>
			{/*{children}*/}
			{isDeletable && <ToolbarButton iconName="mdiDeleteForever" tooltip={ss.i18n._t("ZAUBERFISCH_PAGEBUILDER.DeleteElement")} onClick={() => actions.delete(id)} />}
		</React.Fragment>, refToolbarTop.current)
	}
	return null
}
