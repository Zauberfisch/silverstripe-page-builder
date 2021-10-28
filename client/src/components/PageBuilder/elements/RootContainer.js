import React from "react"
import {ElementContainer, ToolbarPortalTop} from "components/PageBuilder/element-utilities"
import {ClipboardPasteButton} from "../element-utilities/ClipboardPasteButton"

export const RootContainer = ({children}) => {
	return (
		<ElementContainer padding={false} style={{border: 0}}>
			<ToolbarPortalTop childrenRight={<ClipboardPasteButton />} />
			<div style={{padding: 15}}>{children}</div>
		</ElementContainer>
	)
}

RootContainer.getTypeDisplayName = () => ss.i18n._t("ZAUBERFISCH_PAGEBUILDER_ELEMENT.RootContainer")
