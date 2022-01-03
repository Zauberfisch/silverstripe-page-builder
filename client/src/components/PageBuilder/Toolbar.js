import {useEditor} from "@craftjs/core"
import React from "react"
import styles from "./Toolbar.module.scss"
import {ToolbarButtonComponent, AddNewButton, ToolbarSeparator} from "./form"
import {EventBus} from "components/PageBuilder/utility"

export const Toolbar = ({refToolbarTop, refToolbarRows}) => {
	const {actions, canUndo, canRedo, query} = useEditor(
		(state, _query) => {
			return {
				// enabled: state.options.enabled,
				canUndo: state.options.enabled && _query.history.canUndo(),
				canRedo: state.options.enabled && _query.history.canRedo(),
			}
		},
	)
	const [isBusy, setIsBusy] = React.useState(false)
	const undo = React.useCallback(() => {
		setIsBusy(true)
		actions.history.undo()
		setTimeout(() => {
			EventBus.emit("RELOAD_STATE")
			setIsBusy(false)
		}, 50)
	}, [])
	const redo = React.useCallback(() => {
		setIsBusy(true)
		actions.history.redo()
		setTimeout(() => {
			EventBus.emit("RELOAD_STATE")
			setIsBusy(false)
		}, 50)
	}, [])
	return (
		<div className={styles.toolbar}>
			<div className={styles.toolbarInner} ref={refToolbarRows}>
				<div className={styles.toolbarRow} ref={refToolbarTop}>
					<ToolbarButtonComponent iconLeft={{iconName: "mdiUndoVariant"}} tooltip={ss.i18n._t("ZAUBERFISCH_PAGEBUILDER.Undo")} disabled={!canUndo && !isBusy} onClick={undo} />
					<ToolbarButtonComponent iconLeft={{iconName: "mdiRedoVariant"}} tooltip={ss.i18n._t("ZAUBERFISCH_PAGEBUILDER.Redo")} disabled={!canRedo && !isBusy} onClick={redo} />
					<ToolbarSeparator />
					<AddNewButton />
					{/*{selected ? <React.Fragment>*/}
					{/*	<div style={{paddingRight: 5}}>{selected.displayName}</div>*/}
					{/*	{selected.related && selected.related.ToolbarTopRowItems ? React.createElement(selected.related.ToolbarTopRowItems) : null}*/}
					{/*	{selected.isDeletable && <ToolbarButton iconName="TrashIcon" tooltip={ss.i18n._t("ZAUBERFISCH_PAGEBUILDER.DeleteElement")} onClick={() => actions.delete(selected.id)} />}*/}
					{/*</React.Fragment> : null}*/}
				</div>
				{/*{selected && selected.related && selected.related.ToolbarTopRowItems ? React.createElement(selected.related.ToolbarTopRowItems) : null}*/}
			</div>
		</div>
	)
}
