import Injector from "lib/Injector"
import PageBuilderField from "components/PageBuilder/PageBuilderField"
import {Container, RootContainer} from "../components/PageBuilder/elements"

window.document.addEventListener("DOMContentLoaded", () => {
	Injector.component.registerMany({
		PageBuilderField,
		"zauberfisch\\PageBuilder\\Element\\Container": Container,
		"zauberfisch\\PageBuilder\\Element\\RootContainer": RootContainer,
	})
})
