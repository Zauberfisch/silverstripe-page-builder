import React from "react"
import {PageBuilderContext} from "components/PageBuilder/PageBuilderContext"
import {useNodeState} from "components/PageBuilder/hooks/useNodeState"
import ReactDOM from "react-dom"
import {useEditor} from "@craftjs/core"
import {ToolbarButton, ToolbarSeparator} from "components/PageBuilder/form"
import DeletionModal from "components/DeletionModal"
import {ClipboardCopyButton} from "./ClipboardCopyButton"

export function ToolbarPortalTop({children, childrenRight}) {
	const {actions} = useEditor()
	const {isActive, isDeletable, id, displayName, parentId} = useNodeState()
	const {refToolbarTop} = React.useContext(PageBuilderContext)
	const [requireDeleteConfirmation, setRequireDeleteConfirmation] = React.useState(false)
	const onGoUp = React.useCallback(() => actions.selectNode(parentId), [parentId])
	const onDelete = React.useCallback(() => setRequireDeleteConfirmation(true), [])
	const onDeleteConfirm = React.useCallback(() => actions.delete(id), [id])
	const onDeleteCancel = React.useCallback(() => setRequireDeleteConfirmation(false), [])
	const deletionModalActions = React.useMemo(() => ([
		{
			label: ss.i18n._t("ZAUBERFISCH_PAGEBUILDER.DeleteElementConfirmButton"),
			handler: onDeleteConfirm,
			color: "danger",
		},
		{
			label: ss.i18n._t("ZAUBERFISCH_PAGEBUILDER.DeleteElementCancelButton"),
			handler: onDeleteCancel,
		},
	]), [id])

	if (isActive && refToolbarTop && refToolbarTop.current) {
		return ReactDOM.createPortal(<React.Fragment>
			{children && <React.Fragment>
				<ToolbarSeparator />
				{children}
			</React.Fragment>}
			<div style={{flexGrow: 999}} />
			<div style={{paddingRight: 5}}>
				<span>{displayName}</span>
			</div>
			{childrenRight}
			{isDeletable && <ClipboardCopyButton />}
			{isDeletable && <ToolbarButton iconName="mdiArrowUp" tooltip={ss.i18n._t("ZAUBERFISCH_PAGEBUILDER.ParentElement")} onClick={onGoUp} />}
			{isDeletable && <ToolbarButton iconName="mdiDeleteForever" tooltip={ss.i18n._t("ZAUBERFISCH_PAGEBUILDER.DeleteElement")} onClick={onDelete} />}
			<DeletionModal
				isOpen={requireDeleteConfirmation}
				body={ss.i18n._t("ZAUBERFISCH_PAGEBUILDER.DeleteElementConfirm")}
				onCancel={onDeleteCancel}
				actions={deletionModalActions}
			/>
		</React.Fragment>, refToolbarTop.current)
	}
	return null
}
