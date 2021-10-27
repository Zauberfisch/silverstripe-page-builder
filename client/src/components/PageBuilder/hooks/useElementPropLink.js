import React from "react"
import {useNode} from "@craftjs/core"
import {ToolbarButton, ToolbarDropdown} from "components/PageBuilder/Toolbar"
import {LinkModalEmail, LinkModalExternal, LinkModalFile, LinkModalInternal} from "components/LinkModals"
import {DropdownItem} from "reactstrap"

function useLinkTypes() {
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

export function useElementPropLink(propName, value) {
	const {actions: {setProp}} = useNode()
	const linkTypes = useLinkTypes()
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
	const onInsert = React.useCallback((data, file) => {
		delete data.SecurityID
		delete data["action_insert"]
		delete data.AssetEditorHeaderFieldGroup
		delete data.TitleHeader
		delete data.Editor
		delete data.FileSpecs
		data.Type = openModalId
		let url = ""
		if (openModalId === "Internal") {
			url = data.PageID
		} else if (openModalId === "External") {
			url = data.Link
			if (data.Anchor) {
				url += `#${encodeURIComponent(data.Anchor)}`
			}
		} else if (openModalId === "Email") {
			url = `mailto:${data.Link}`
			if (data.Subject) {
				url += `?subject=${encodeURIComponent(data.Subject)}`
			}
		} else if (openModalId === "File") {
			url = file.url

		}
		setProp((_props) => {
			// eslint-disable-next-line no-param-reassign
			_props[propName] = {data, url}
		})
		setOpenModalId("")
	}, [openModalId])
	const onClosed = React.useCallback(() => setOpenModalId(""), [])
	const hasValue = !!(value && typeof value === "object")
	const _value = hasValue ? value : {}
	return {
		value: _value,
		hasValue,
		url: _value.url || null,
		// url: hasValue ? _value.file.url : null,
		addButton: <React.Fragment>
			<ToolbarDropdown tooltip={ss.i18n._t("ZAUBERFISCH_PAGEBUILDER_useElementPropLink.AddLink")} iconName="mdiLink">
				{linkTypes.map(({title, id}) => (
					<DropdownItem data-modalid={id} onClick={addLink} style={{padding: "0 10px"}}>
						{title}
					</DropdownItem>
				))}
			</ToolbarDropdown>
			{linkTypes.map(({id, component}) => (
				React.createElement(component, {key: id, fileAttributes: _value, onInsert, onClosed, isOpen: openModalId === id})
			))}
		</React.Fragment>,
		removeButton: <ToolbarButton iconName="mdiLinkOff" tooltip={ss.i18n._t("ZAUBERFISCH_PAGEBUILDER_useElementPropLink.RemoveLink")} onClick={removeLink} disabled={!hasValue} />,
	}
}
