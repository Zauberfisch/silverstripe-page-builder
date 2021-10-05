/* global window */
import Injector from "lib/Injector"
import PageBuilderField from "../components/PageBuilderField"

window.document.addEventListener("DOMContentLoaded", () => {
	Injector.component.registerMany({
		PageBuilderField,
	})
})
