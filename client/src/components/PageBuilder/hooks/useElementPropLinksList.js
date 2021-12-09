import React from "react"
import {useNode} from "@craftjs/core"
import {ToolbarButton, ToolbarDropdown} from "components/PageBuilder/form"
import {DropdownItem} from "reactstrap"
import {useElementPropLinkTypes, useElementPropLinkInsertCallback} from "./useElementPropLink"

export function useElementPropLinksList(propName, value) {
	const {actions: {setProp}} = useNode()
	const linkTypes = useElementPropLinkTypes()
	const [openModalId, setOpenModalId] = React.useState("")
	const addLink = React.useCallback((e) => {
		setOpenModalId(e.target.dataset.modalid)
	}, [])
	const removeLink = React.useCallback((e) => {
		const index = e.target.dataset.itemindex
		setProp((_props) => {
			// eslint-disable-next-line no-param-reassign
			const newValue = JSON.parse(JSON.stringify(_props[propName]))
			newValue.splice(index, 1)
			_props[propName] = newValue
		})
	}, [])
	const onInsert = useElementPropLinkInsertCallback(linkData => {
		setProp((_props) => {
			// eslint-disable-next-line no-param-reassign
			let newValue = []
			if (_props[propName] && Array.isArray(_props[propName])) {
				newValue = JSON.parse(JSON.stringify(_props[propName]))
			}
			newValue.push(linkData)
			_props[propName] = newValue
		})
		setOpenModalId("")
	}, openModalId, [])
	const onClosed = React.useCallback(() => setOpenModalId(""), [])
	const hasValue = !!(value && Array.isArray(value))
	const _value = hasValue ? value : []
	return {
		value: _value,
		hasValue,
		addButton: (
			<ToolbarDropdown tooltip={ss.i18n._t("ZAUBERFISCH_PAGEBUILDER_useElementPropLink.AddLink")} iconName="mdiLink">
				{linkTypes.map(({title, id}) => (
					<DropdownItem data-modalid={id} onClick={addLink} style={{padding: "0 10px"}}>
						{title}
					</DropdownItem>
				))}
			</ToolbarDropdown>
		),
		removeButtons: _value.map((item, i) => (
			<ToolbarButton iconName="mdiLinkOff" tooltip={ss.i18n._t("ZAUBERFISCH_PAGEBUILDER_useElementPropLink.RemoveLink")} data-itemindex={i} onClick={removeLink} disabled={!hasValue} />
		)),
		popup: (
			<React.Fragment>
				{linkTypes.map(({id, component}) => (
					React.createElement(component, {key: id, fileAttributes: _value, onInsert, onClosed, isOpen: openModalId === id})
				))}
			</React.Fragment>
		),
		addHandler: addLink,
		removeHandler: removeLink,
		// removeButton:
	}
}
