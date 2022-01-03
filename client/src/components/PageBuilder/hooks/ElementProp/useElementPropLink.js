import React from "react"
import {useNode} from "@craftjs/core"
import {LinkModalEmail, LinkModalExternal, LinkModalFile, LinkModalInternal} from "../../../LinkModals"

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
	const value = props[propName] || {}
	// const propNameType = `${propName}Type`
	// const propNameValue = `${propName}Value`
	// const linkType = props[propNameType] || ""
	// const value = props[propNameValue] || {}
	const {actions: {setProp}} = useNode()
	const clearHandler = React.useCallback(() => {
		setProp((_props) => {
			// eslint-disable-next-line no-param-reassign
			_props[propName] = null
		})
	}, [propName])
	const changeHandler = React.useCallback((linkData) => {
		setProp((_props) => {
			// eslint-disable-next-line no-param-reassign
			_props[propName] = linkData
		})
	}, [propName])
	const hasValue = !!(value && typeof value.data === "object" && allowedLinkTypes.includes(value.linkType))
	const _value = hasValue ? value : {}
	// console.log("useElementPropLink", {value, hasValue})
	// let url = ""
	// if (hasValue) {
	// 	if (linkType === '')
	// }
	const linkTypes = useElementPropLinkTypes(allowedLinkTypes)
	return {
		propName,
		// linkType,
		value: _value,
		// modalOpen,
		hasValue,
		// fileName: hasValue ? _value.data.FileFilename : null,
		// url: hasValue ? _value.url : null,
		changeHandler,
		clearHandler,
		// changeTypeHandler,
		allowedLinkTypes,
		linkTypes,
		// insertHandler,
		// closeHandler,
	}
}
