import React from "react"
import {ElementPropHelper} from "./ElementPropHelper"
import {LinkModalEmail, LinkModalExternal, LinkModalFile, LinkModalInternal} from "../../modals"

export function useElementPropLinkTypes(allowedLinkTypes = ["Internal", "External", "Email", "File"]) {
	return React.useMemo(() => [
		{
			id: "Internal",
			title: ss.i18n._t("ZAUBERFISCH_PAGEBUILDER_useElementPropLink.AddLinkInternal"),
			component: LinkModalInternal,
			// getUrlFromValue: (value) => {
			// 	return value.data && value.data.
			// }
		},
		{
			id: "External",
			title: ss.i18n._t("ZAUBERFISCH_PAGEBUILDER_useElementPropLink.AddLinkExternal"),
			component: LinkModalExternal,
		},
		{
			id: "Email",
			title: ss.i18n._t("ZAUBERFISCH_PAGEBUILDER_useElementPropLink.AddLinkEmail"),
			component: LinkModalEmail,
		},
		{
			id: "File",
			title: ss.i18n._t("ZAUBERFISCH_PAGEBUILDER_useElementPropLink.AddLinkFile"),
			component: LinkModalFile,
		},
	].filter(type => allowedLinkTypes.includes(type.id)), [JSON.stringify(allowedLinkTypes)])
}

export function useElementPropLink(props, propName, allowedLinkTypes = ["Internal", "External", "Email", "File"]) {
	return ElementPropHelper.useElementProp(props, propName, ElementPropHelper.CREATE_TYPE_LINK(allowedLinkTypes))
}
