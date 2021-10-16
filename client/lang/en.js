if (typeof (ss) === "undefined" || typeof (ss.i18n) === "undefined") {
	if (typeof (console) !== "undefined") { // eslint-disable-line no-console
		console.error("Class ss.i18n not defined")  // eslint-disable-line no-console
	}
} else {
	ss.i18n.addDictionary("en", {
		"ZAUBERFISCH_PAGEBUILDER.Undo": "Undo",
		"ZAUBERFISCH_PAGEBUILDER.Redo": "Redo",
		"ZAUBERFISCH_PAGEBUILDER.Add": "Add",
		"ZAUBERFISCH_PAGEBUILDER.AddDropdownTitle": "Add with drag&drop",
		"ZAUBERFISCH_PAGEBUILDER_ELEMENT.Button": "Button",
		"ZAUBERFISCH_PAGEBUILDER_ELEMENT.Container": "Container",
		"ZAUBERFISCH_PAGEBUILDER_ELEMENT.Text": "Text",
		"ZAUBERFISCH_PAGEBUILDER_ELEMENT.DraftEditor": "Draft Editor",
	})
}
