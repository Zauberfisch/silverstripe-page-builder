import React from "react"
import lz from "lzutf8"
import {getRandomId as getRandomNodeId} from "@craftjs/utils"
import {ToolbarButton} from "../form"
import {useEditor} from "@craftjs/core"
import {useNodeState} from "../hooks/useNodeState"
import {connect as reduxConnect} from "react-redux"
import {bindActionCreators} from "redux"
import * as toastsActions from "state/toasts/ToastsActions"
import {Modal, ModalHeader, ModalBody, ModalFooter, Button} from "reactstrap"
const requiresModal = !navigator.clipboard || typeof navigator.clipboard.readText !== "function"

const PasteModal = ({isOpen, close, insertIntoNodeId, query, actions}) => {
	const [jsonToImport, setJsonToImport] = React.useState("")
	const onChange = React.useCallback((e) => setJsonToImport(e.target.value), [])
	const onClick = React.useCallback(() => {
		importFromPaste(jsonToImport, insertIntoNodeId, query, actions)
		close()
	}, [jsonToImport, insertIntoNodeId])
	return (
		<Modal isOpen={isOpen} toggle={close}>
			<ModalHeader toggle={close}>
				{ss.i18n._t("ZAUBERFISCH_PAGEBUILDER_ELEMENT.Container.PasteHeader", "Paste element")}
			</ModalHeader>
			<ModalBody>
				<textarea {...{onChange, value: jsonToImport}} style={{width: "100%", minHeight: 200}} />
				{/*<TextAreaField textProp={{jsonToImport, onChange}} />*/}
			</ModalBody>
			<ModalFooter>
				<Button color={"primary"} onClick={onClick}>{ss.i18n._t("ZAUBERFISCH_PAGEBUILDER_ELEMENT.Container.PasteSubmit", "Submit")}</Button>
			</ModalFooter>
		</Modal>
	)
}


function importFromPaste(str, insertIntoNodeId, query, actions) {
	const json = lz.decompress(lz.decodeBase64(str))
	const newNodes = JSON.parse(json)
	const nodesArray = Object.entries(newNodes.nodes).map(([_id, nodeData]) => {
		const newId = getRandomNodeId()
		return {
			oldId: _id,
			newId,
			node: query.parseSerializedNode(nodeData).toNode((node) => {
				node.id = newId
			}),
		}
	})
	const findNode = (_oldId) => {
		return nodesArray.find(({oldId}) => oldId === _oldId)
	}
	const processNode = (oldId, parentNodeId) => {
		const {newId, node} = findNode(oldId)
		const childrenNodeIds = node.data.nodes && node.data.nodes.length ? node.data.nodes : []
		node.data.nodes = []
		node.data.parent = parentNodeId
		actions.add(node, parentNodeId)
		if (childrenNodeIds.length) {
			childrenNodeIds.forEach((childOldId) => processNode(childOldId, newId))
		}
	}
	processNode(newNodes.rootNodeId, insertIntoNodeId)
}

export function _ClipboardPasteButton({toastsActions}) {
	const {actions, query} = useEditor()
	const {id} = useNodeState()
	const [isOpen, setIsOpen] = React.useState(false)
	const onClick = React.useCallback(() => {
		if (requiresModal) {
			setIsOpen(true)
		} else {
			navigator.clipboard.readText().then(
				(str) => {
					importFromPaste(str, id, query, actions)
					toastsActions.success(ss.i18n._t("ZAUBERFISCH_PAGEBUILDER.ClipboardPasteButton.Success"))
				},
				(e) => toastsActions.error(ss.i18n._t("ZAUBERFISCH_PAGEBUILDER.ClipboardPasteButton.Error") + ": " + e),
			).catch(
				(e) => toastsActions.error(ss.i18n._t("ZAUBERFISCH_PAGEBUILDER.ClipboardPasteButton.Error") + ": " + e),
			)
		}
	}, [])
	const close = React.useCallback(() => setIsOpen(false), [])
	return (
		<React.Fragment>
			{requiresModal ? <PasteModal {...{isOpen, close, insertIntoNodeId: id, query, actions}} /> : null}
			<ToolbarButton iconName="mdiClipboardPlay" tooltip={ss.i18n._t("ZAUBERFISCH_PAGEBUILDER.ClipboardPasteButton.Tooltip")} onClick={onClick} />
		</React.Fragment>
	)
}

export const ClipboardPasteButton = reduxConnect(
	() => ({}),
	(dispatch) => ({toastsActions: bindActionCreators(toastsActions, dispatch)}),
)(_ClipboardPasteButton)
