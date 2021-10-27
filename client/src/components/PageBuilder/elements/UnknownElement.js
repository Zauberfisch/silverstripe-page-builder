import React from "react"
import {ElementContainer, ToolbarPortalTop} from "components/PageBuilder/element-utilities"
import FormAlert from "components/FormAlert/FormAlert"

export function UnknownElement({children}) {
	return (
		<ElementContainer>
			<ToolbarPortalTop />
			<FormAlert value={ss.i18n._t("ZAUBERFISCH_PAGEBUILDER_ELEMENT.UnknownElementMessage")} type="bad" />
			{children}
		</ElementContainer>
	)
}

UnknownElement.getTypeDisplayName = () => ss.i18n._t("ZAUBERFISCH_PAGEBUILDER_ELEMENT.UnknownElement")

UnknownElement.craft = {
	related: {},
}
