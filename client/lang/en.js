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
		"ZAUBERFISCH_PAGEBUILDER_ELEMENT.Button": "Button",
		"ZAUBERFISCH_PAGEBUILDER_ELEMENT.Container": "Container",
		"ZAUBERFISCH_PAGEBUILDER_ELEMENT.RootContainer": "Root",
		"ZAUBERFISCH_PAGEBUILDER_ELEMENT.Text": "Text",
	})
}
