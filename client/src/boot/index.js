/* global window */
import Injector from "lib/Injector"
import PageBuilderField from "../components/PageBuilderField"
import {CreateElementButton} from "../components/editor/CreateElementButton"
import {ToolbarButton, ToolbarSelect, ToolbarDropdown, ToolbarMultiSelect, ToolbarSeparator} from "../components/editor/Toolbar"
import {ElementContainer, ToolbarPortalTop, ToolbarPortalRow} from "../components/editor/ElementUtilities"

window.document.addEventListener("DOMContentLoaded", () => {
	Injector.component.registerMany({
		PageBuilderField,
		"PageBuilder/CreateElementButton": CreateElementButton,
		"PageBuilder/ToolbarButton": ToolbarButton,
		"PageBuilder/ToolbarSelect": ToolbarSelect,
		"PageBuilder/ToolbarDropdown": ToolbarDropdown,
		"PageBuilder/ToolbarMultiSelect": ToolbarMultiSelect,
		"PageBuilder/ElementContainer": ElementContainer,
		"PageBuilder/ToolbarPortalTop": ToolbarPortalTop,
		"PageBuilder/ToolbarPortalRow": ToolbarPortalRow,
		"PageBuilder/ToolbarSeparator": ToolbarSeparator,
	})
})
