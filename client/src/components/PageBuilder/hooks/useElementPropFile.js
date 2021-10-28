import React from "react"
import {useNode} from "@craftjs/core"
import {ToolbarButton} from "components/PageBuilder/form"
import {EmbedModalFile} from "components/LinkModals"

export function useElementPropFile(propName, value) {
	const {actions: {setProp}} = useNode()
	const [isOpen, setIsOpen] = React.useState(false)
	const add = React.useCallback(() => {
		setIsOpen(true)
	}, [])
	const remove = React.useCallback(() => {
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
		setProp((_props) => {
			// eslint-disable-next-line no-param-reassign
			_props[propName] = {data, file}
		})
		setIsOpen(false)
	}, [])
	const onClosed = React.useCallback(() => setIsOpen(false), [])
	const hasValue = !!(value && typeof value.data === "object" && typeof value.file === "object")
	const _value = hasValue ? value : {}
	return {
		value: _value,
		hasValue,
		url: hasValue ? _value.file.url : null,
		addButton: <React.Fragment>
			<ToolbarButton iconName="mdiFolder" tooltip={ss.i18n._t("ZAUBERFISCH_PAGEBUILDER_useElementPropFile.Add")} onClick={add} />
			<EmbedModalFile {...{onInsert, onClosed, isOpen, fileAttributes: _value}} />
		</React.Fragment>,
		removeButton: <ToolbarButton iconName="mdiFolderRemove" tooltip={ss.i18n._t("ZAUBERFISCH_PAGEBUILDER_useElementPropFile.Remove")} onClick={remove} disabled={!hasValue} />,
	}
}
