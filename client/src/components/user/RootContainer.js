import React from "react"
import {ElementContainer, ToolbarPortalTop} from "../editor/ElementUtilities"

export const RootContainer = ({background, padding, children, ...props}) => {
	return (
		<ElementContainer>
			<ToolbarPortalTop />
			<div style={{padding: 15}}>{children}</div>
		</ElementContainer>
	)
}

RootContainer.getTypeDisplayName = () => ss.i18n._t("ZAUBERFISCH_PAGEBUILDER_ELEMENT.Container")