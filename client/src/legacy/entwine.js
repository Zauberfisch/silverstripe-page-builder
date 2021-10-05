import jQuery from "jquery"
import React from "react"
import ReactDOM from "react-dom"
import {loadComponent} from "lib/Injector"

jQuery.entwine("ss", ($) => {
	$(".js-injector-boot .form__field-holder .zauberfisch__page-builder__field").entwine({
		onmatch() {
			const PageBuilderField = loadComponent("PageBuilderField")
			// const schemaData = this.data("schema")

			const props = {
				// source: schemaData.source,
				// value: schemaData.value,
				// name: schemaData.name,
			}

			ReactDOM.render(
				<PageBuilderField {...props} />,
				this[0],
			)
		},

		onunmatch() {
			ReactDOM.unmountComponentAtNode(this[0])
		},
	})
})
