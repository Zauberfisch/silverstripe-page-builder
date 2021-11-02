if (typeof (ss) === "undefined" || typeof (ss.i18n) === "undefined") {
	if (typeof (console) !== "undefined") { // eslint-disable-line no-console
		console.error("Class ss.i18n not defined")  // eslint-disable-line no-console
	}
} else {
	ss.i18n.addDictionary("en", {
		"ZAUBERFISCH_PAGEBUILDER.ParentElement": "Select parent",
		"ZAUBERFISCH_PAGEBUILDER.DeleteElement": "Delete",
		"ZAUBERFISCH_PAGEBUILDER.DeleteElementConfirmButton": "Delete",
		"ZAUBERFISCH_PAGEBUILDER.DeleteElementCancelButton": "Cancel",
		"ZAUBERFISCH_PAGEBUILDER.DeleteElementConfirm": "Are you sure you want to delete the selected element?",
		"ZAUBERFISCH_PAGEBUILDER.Undo": "Undo",
		"ZAUBERFISCH_PAGEBUILDER.Redo": "Redo",
		"ZAUBERFISCH_PAGEBUILDER.Add": "Add new element",
		"ZAUBERFISCH_PAGEBUILDER.AddDropdownTitle": "Add with drag&drop",
		"ZAUBERFISCH_PAGEBUILDER_ELEMENT.RootContainer": "Root",
		"ZAUBERFISCH_PAGEBUILDER_ELEMENT.UnknownElement": "Unknown Element",
		"ZAUBERFISCH_PAGEBUILDER_ELEMENT.UnknownElementMessage": "ERROR: Element type does not exist",
		"ZAUBERFISCH_PAGEBUILDER_useElementPropLink.RemoveLink": "Remove Link",
		"ZAUBERFISCH_PAGEBUILDER_useElementPropLink.AddLink": "Add Link",
		"ZAUBERFISCH_PAGEBUILDER_useElementPropLink.AddLinkInternal": "Internal",
		"ZAUBERFISCH_PAGEBUILDER_useElementPropLink.AddLinkExternal": "External",
		"ZAUBERFISCH_PAGEBUILDER_useElementPropLink.AddLinkEmail": "Email",
		"ZAUBERFISCH_PAGEBUILDER_useElementPropLink.AddLinkFile": "File",
		"ZAUBERFISCH_PAGEBUILDER_useElementPropFile.Add": "Add File",
		"ZAUBERFISCH_PAGEBUILDER_useElementPropFile.Remove": "Remove File",
		"ZAUBERFISCH_PAGEBUILDER_useElementPropImage.Add": "Add Image",
		"ZAUBERFISCH_PAGEBUILDER_useElementPropImage.Remove": "Remove Image",

		"ZAUBERFISCH_PAGEBUILDER.CopyToClipboardButton.Tooltip": "Copy to clipboard",
		"ZAUBERFISCH_PAGEBUILDER.CopyToClipboardButton.Success": "Element has been copied to clipboard",
		"ZAUBERFISCH_PAGEBUILDER.CopyToClipboardButton.Error": "Error copying to clipboard",

		"ZAUBERFISCH_PAGEBUILDER.ClipboardPasteButton.Tooltip": "Paste from clipboard",
		"ZAUBERFISCH_PAGEBUILDER.ClipboardPasteButton.Error": "Error pasting from clipboard",
		"ZAUBERFISCH_PAGEBUILDER.ClipboardPasteButton.Success": "Elements pasted successfully",
	})
}
