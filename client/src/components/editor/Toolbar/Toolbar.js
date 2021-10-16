import {useEditor} from "@craftjs/core"
import React from "react"
import styles from "./Toolbar.module.scss"
import {ToolbarButton} from "./ToolbarButton"
import {AddNewButton} from "./AddNewButton"
import {ToolbarSeparator} from "./ToolbarSeparator"

export const Toolbar = ({refToolbarTop, refToolbarRows}) => {
	const {actions, canUndo, canRedo} = useEditor(
		(state, _query) => {
			return {
				// enabled: state.options.enabled,
				canUndo: state.options.enabled && _query.history.canUndo(),
				canRedo: state.options.enabled && _query.history.canRedo(),
			}
		},
	)
	return (
		<div className={styles.toolbar}>
			<div className={styles.toolbarInner} ref={refToolbarRows}>
				<div className={styles.toolbarRow} ref={refToolbarTop}>
					<ToolbarButton iconName="mdiUndoVariant" tooltip={ss.i18n._t("ZAUBERFISCH_PAGEBUILDER.Undo")} disabled={!canUndo} onClick={() => actions.history.undo()} />
					<ToolbarButton iconName="mdiRedoVariant" tooltip={ss.i18n._t("ZAUBERFISCH_PAGEBUILDER.Redo")} disabled={!canRedo} onClick={() => actions.history.redo()} />
					<ToolbarSeparator/>
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
