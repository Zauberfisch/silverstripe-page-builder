import React from "react"
import {ElementContainer, ToolbarPortalTop} from "components/PageBuilder/element-utilities"

export const RootContainer = ({children}) => {
	return (
		<ElementContainer style={{border: 0}}>
			<ToolbarPortalTop />
			<div style={{padding: 15}}>{children}</div>
		</ElementContainer>
	)
}

RootContainer.getTypeDisplayName = () => ss.i18n._t("ZAUBERFISCH_PAGEBUILDER_ELEMENT.RootContainer")
