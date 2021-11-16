import React from "react"
import lz from "lzutf8"
import {connect as reduxConnect} from "react-redux"
import {bindActionCreators} from "redux"
import * as toastsActions from "state/toasts/ToastsActions"
import {useNodeState} from "components/PageBuilder/hooks/useNodeState"
import {useEditor} from "@craftjs/core"
import {ToolbarButton} from "../form"

const hasClipboard = navigator.clipboard && typeof navigator.clipboard.writeText === "function"

function _ClipboardCopyButton({toastsActions}) {
	const {query} = useEditor()
	const {id} = useNodeState()

	const onClick = React.useCallback(() => {
		const tree = query.node(id).toNodeTree()
		let nodes = Object.fromEntries(Object.keys(tree.nodes).map((_id) => [
			_id,
			query.node(_id).toSerializedNode(),
		]))
		const json = JSON.stringify({rootNodeId: tree.rootNodeId, nodes})
		const str = lz.encodeBase64(lz.compress(json))
		navigator.clipboard.writeText(str).then(
			() => toastsActions.success(ss.i18n._t("ZAUBERFISCH_PAGEBUILDER.CopyToClipboardButton.Success")),
			() => toastsActions.error(ss.i18n._t("ZAUBERFISCH_PAGEBUILDER.CopyToClipboardButton.Error")),
		).catch(
			() => toastsActions.error(ss.i18n._t("ZAUBERFISCH_PAGEBUILDER.CopyToClipboardButton.Error")),
		)
	}, [id])
	return (
		<ToolbarButton iconName="mdiTrayArrowUp" tooltip={ss.i18n._t("ZAUBERFISCH_PAGEBUILDER.CopyToClipboardButton.Tooltip")} onClick={onClick} disabled={!hasClipboard} />
	)
}

export const ClipboardCopyButton = reduxConnect(
	() => ({}),
	(dispatch) => ({toastsActions: bindActionCreators(toastsActions, dispatch)}),
)(_ClipboardCopyButton)
