import Injector from "lib/Injector"
import PageBuilderField from "components/PageBuilder/PageBuilderField"

window.document.addEventListener("DOMContentLoaded", () => {
	Injector.component.registerMany({
		PageBuilderField,
	})
})
