import React from "react"
import {createInsertLinkModal} from "containers/InsertLinkModal/InsertLinkModal"

const InsertLinkExternalModal = createInsertLinkModal("SilverStripe\\Admin\\LeftAndMain", "EditorExternalLink")
const InsertLinkEmailModal = createInsertLinkModal("SilverStripe\\Admin\\LeftAndMain", "EditorEmailLink")
const InsertLinkInternalModal = createInsertLinkModal("SilverStripe\\CMS\\Controllers\\CMSPageEditController", "editorInternalLink")
import InsertMediaModal from "containers/InsertMediaModal/InsertMediaModal"

function onInsertData(data) {
	delete data.SecurityID
	delete data["action_insert"]
	delete data.AssetEditorHeaderFieldGroup
	delete data.TitleHeader
	delete data.Editor
	delete data.FileSpecs
	return data
}
function onInsertFile(file) {
	return typeof file === "object" ? {
		url: file.url,
		extension: file.extension,
		type: file.__typename,
		category: file.category,
		thumbnail: file.thumbnail,
		smallThumbnail: file.smallThumbnail,
	} : {}
}

export function LinkModalExternal(props) {
	return (
		<InsertLinkExternalModal
			title={i18n._t("Admin.LINK_EXTERNAL", "Insert external link")}
			requireLinkText={false}
			{...props}
		/>
	)
	// bodyClassName="modal__dialog"
	// className="insert-link__dialog-wrapper--external"
	// identifier="Admin.InsertLinkExternalModal"
}

export function LinkModalInternal(props) {
	return (
		<InsertLinkInternalModal
			title={i18n._t("CMS.LINK_ANCHOR", "Link to an anchor on a page")}
			requireLinkText={false}
			{...props}
		/>
	)
	// bodyClassName="modal__dialog"
	// className="insert-link__dialog-wrapper--internal"
	// identifier="Admin.InsertLinkInternalModal"
}

export function LinkModalEmail(props) {
	return (
		<InsertLinkEmailModal
			title={i18n._t("Admin.LINK_EMAIL", "Insert email link")}
			requireLinkText={false}
			{...props}
		/>
		// bodyClassName="modal__dialog"
		// className="insert-link__dialog-wrapper--email"
		// identifier="Admin.InsertLinkEmailModal"
	)
}

export function LinkModalFile({onInsert, ...props}) {
	return (
		<InsertMediaModal
			{...props}
			type="insert-link"
			onInsert={(data, file) => {
				onInsert(onInsertData(data), onInsertFile(file))
				return Promise.resolve()
			}}
			title={false}
			requireLinkText={false}
		/>
	)
	// bodyClassName="modal__dialog"
	// className="insert-link__dialog-wrapper--internal"
}

export function EmbedModalFile({onInsert, ...props}) {
	// 'insert-media', 'insert-link', 'select', 'admin'
	return (
		<InsertMediaModal
			{...props}
			type="insert-link"
			onInsert={(data, file) => {
				onInsert(onInsertData(data), onInsertFile(file))
				return Promise.resolve()
			}}
			title={false}
			requireLinkText={false}
		/>
	)
}

export function EmbedModalImage({onInsert, ...props}) {
	// 'insert-media', 'insert-link', 'select', 'admin'
	return (
		<InsertMediaModal
			{...props}
			type="insert-link"
			onInsert={(data, file) => {
				onInsert(onInsertData(data), onInsertFile(file))
				return Promise.resolve()
			}}
			title={false}
			requireLinkText={false}
		/>
	)
}
