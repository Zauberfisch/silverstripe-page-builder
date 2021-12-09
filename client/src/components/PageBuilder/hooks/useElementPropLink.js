import React from "react"
import {useNode} from "@craftjs/core"
import {ToolbarButton, ToolbarDropdown} from "components/PageBuilder/form"
import {LinkModalEmail, LinkModalExternal, LinkModalFile, LinkModalInternal} from "components/LinkModals"
import {DropdownItem} from "reactstrap"

export function useElementPropLinkTypes() {
	return React.useMemo(() => [
		{
			id: "Internal",
			title: ss.i18n._t("ZAUBERFISCH_PAGEBUILDER_useElementPropLink.AddLinkInternal"),
			component: LinkModalInternal,
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
	], [])
}

export function useElementPropLinkInsertCallback(callback, linkType, deps) {
	return React.useCallback((data, file) => {
		delete data.SecurityID
		delete data["action_insert"]
		delete data.AssetEditorHeaderFieldGroup
		delete data.TitleHeader
		delete data.Editor
		delete data.FileSpecs
		// let link = ""
		// if (type === "Internal") {
		// 	link = data.PageID
		// } else if (type === "External") {
		// 	link = data.Link
		// 	if (data.Anchor) {
		// 		link += `#${encodeURIComponent(data.Anchor)}`
		// 	}
		// } else if (type === "Email") {
		// 	link = `mailto:${data.Link}`
		// 	if (data.Subject) {
		// 		link += `?subject=${encodeURIComponent(data.Subject)}`
		// 	}
		// } else if (type === "File") {
		// 	link = file.url
		// }
		// callback({type, data, link})
		callback({linkType, data, file: linkType === "File" && typeof file === "object" ? {url: file.url} : {}})
	}, [linkType, ...deps])
}

export function useElementPropLink(propName, value) {
	const {actions: {setProp}} = useNode()
	const linkTypes = useElementPropLinkTypes()
	const [openModalId, setOpenModalId] = React.useState("")
	const addLink = React.useCallback((e) => {
		setOpenModalId(e.target.dataset.modalid)
	}, [])
	const removeLink = React.useCallback(() => {
		setProp((_props) => {
			// eslint-disable-next-line no-param-reassign
			_props[propName] = null
		})
	}, [])
	const onInsert = useElementPropLinkInsertCallback(linkData => {
		setProp((_props) => {
			// eslint-disable-next-line no-param-reassign
			_props[propName] = linkData
		})
		setOpenModalId("")
	}, openModalId, [])
	const onClosed = React.useCallback(() => setOpenModalId(""), [])
	const hasValue = !!(value && typeof value === "object")
	const _value = hasValue ? value : {}
	return {
		value: _value,
		hasValue,
		url: _value.url || null,
		addButton: (
			<ToolbarDropdown tooltip={ss.i18n._t("ZAUBERFISCH_PAGEBUILDER_useElementPropLink.AddLink")} iconName="mdiLink">
				{linkTypes.map(({title, id}) => (
					<DropdownItem data-modalid={id} onClick={addLink} style={{padding: "0 10px"}}>
						{title}
					</DropdownItem>
				))}
			</ToolbarDropdown>
		),
		removeButton: <ToolbarButton iconName="mdiLinkOff" tooltip={ss.i18n._t("ZAUBERFISCH_PAGEBUILDER_useElementPropLink.RemoveLink")} onClick={removeLink} disabled={!hasValue} />,
		popup: (
			<React.Fragment>
				{linkTypes.map(({id, component}) => (
					React.createElement(component, {key: id, fileAttributes: _value, onInsert, onClosed, isOpen: openModalId === id})
				))}
			</React.Fragment>
		),
		addHandler: addLink,
		removeHandler: removeLink,
	}
}
