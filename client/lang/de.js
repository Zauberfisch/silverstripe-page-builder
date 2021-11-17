if (typeof (ss) === "undefined" || typeof (ss.i18n) === "undefined") {
	if (typeof (console) !== "undefined") { // eslint-disable-line no-console
		console.error("Class ss.i18n not defined")  // eslint-disable-line no-console
	}
} else {
	ss.i18n.addDictionary("de", {
		"ZAUBERFISCH_PAGEBUILDER.ParentElement": "Übergeordnetes Element",
		"ZAUBERFISCH_PAGEBUILDER.DeleteElement": "Löschen",
		"ZAUBERFISCH_PAGEBUILDER.DeleteElementConfirmButton": "Löschen",
		"ZAUBERFISCH_PAGEBUILDER.DeleteElementCancelButton": "Abbrechen",
		"ZAUBERFISCH_PAGEBUILDER.DeleteElementConfirm": "Ausgewähltes Element wirklich löschen?",
		"ZAUBERFISCH_PAGEBUILDER.Undo": "Rückgängig machen",
		"ZAUBERFISCH_PAGEBUILDER.Redo": "Wiederherstellen",
		"ZAUBERFISCH_PAGEBUILDER.Add": "Neues Element hinzufügen",
		"ZAUBERFISCH_PAGEBUILDER.AddDropdownTitle": "Via drag&drop hinzufügen",
		"ZAUBERFISCH_PAGEBUILDER_ELEMENT.UnknownElement": "Unbekanntest Element",
		"ZAUBERFISCH_PAGEBUILDER_ELEMENT.UnknownElementMessage": "FEHLER: Element Typ existiert nicht",
		"ZAUBERFISCH_PAGEBUILDER_useElementPropLink.RemoveLink": "Link entfernen",
		"ZAUBERFISCH_PAGEBUILDER_useElementPropLink.AddLink": "Link hinzufügen",
		"ZAUBERFISCH_PAGEBUILDER_useElementPropLink.AddLinkInternal": "Interner Link",
		"ZAUBERFISCH_PAGEBUILDER_useElementPropLink.AddLinkExternal": "Externer Link",
		"ZAUBERFISCH_PAGEBUILDER_useElementPropLink.AddLinkEmail": "E-Mail Link",
		"ZAUBERFISCH_PAGEBUILDER_useElementPropLink.AddLinkFile": "Datei Link",
		"ZAUBERFISCH_PAGEBUILDER_useElementPropFile.Add": "Datei hinzufügen",
		"ZAUBERFISCH_PAGEBUILDER_useElementPropFile.Remove": "Datei entfernen",
		"ZAUBERFISCH_PAGEBUILDER_useElementPropImage.Add": "Bild hinzufügen",
		"ZAUBERFISCH_PAGEBUILDER_useElementPropImage.Remove": "Bild entfernen",

		"ZAUBERFISCH_PAGEBUILDER.CopyToClipboardButton.Tooltip": "In die Zwischenablage kopieren",
		"ZAUBERFISCH_PAGEBUILDER.CopyToClipboardButton.Success": "Element wurde in die Zwischenablage kopiert",
		"ZAUBERFISCH_PAGEBUILDER.CopyToClipboardButton.Error": "Fehler beim Kopieren in die Zwischenablage",

		"ZAUBERFISCH_PAGEBUILDER.ClipboardPasteButton.Tooltip": "Von Zwischenablage einfügen",
		"ZAUBERFISCH_PAGEBUILDER.ClipboardPasteButton.Error": "Fehler beim einfügen aus der Zwischenablage",
		"ZAUBERFISCH_PAGEBUILDER.ClipboardPasteButton.Success": "Elemente wurden erfolgreich eingefügt"
	})
}
