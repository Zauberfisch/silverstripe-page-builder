import jQuery from "jquery"
import React from "react"
import ReactDOM from "react-dom"
import {loadComponent} from "lib/Injector"
import {throttle} from "lodash"

jQuery.entwine("ss", function ($) {
	$(".js-injector-boot .field.zauberfisch__page-builder__field > .zauberfisch__page-builder__field").entwine({
		PageBuilderEditorQuery: null,
		InputElement: null,
		EditorElement: null,
		OnSubmitCallback: null,
		onmatch() {
			const PageBuilderField = loadComponent("PageBuilderField")
			const schemaData = this.data("schema")
			const input = this.find("> input")
			this.setInputElement(input.get(0))
			this.setEditorElement(this.find("> div").get(0))
			const form = this.closest("form")
			const _this = this
			const setInputValue = (value) => {
				input.val(value)
				// Trigger change detection (see jquery.changetracker.js)
				form.trigger("change")
			}
			const setInputValueThrottled = throttle(setInputValue, 1000)
			const props = {
				elements: schemaData.elements,
				value: schemaData.value,
				// value: this.getInputElement().value,
				setOnSubmitCallback: (callback) => _this.setOnSubmitCallback(callback),
				setInputValue: (value, shouldThrottle = true) => {
					if (shouldThrottle) {
						setInputValueThrottled(value)
					} else {
						setInputValueThrottled.cancel()
						setInputValue(value)
					}
				},
			}
			ReactDOM.render(
				<PageBuilderField {...props} />,
				this.getEditorElement(),
			)
		},

		onunmatch() {
			if (this.getEditorElement()) {
				ReactDOM.unmountComponentAtNode(this.getEditorElement())
			}
		},

		"from .cms-edit-form": {
			onbeforesubmitform: function () {
				const callback = this.getOnSubmitCallback()
				if (callback) {
					callback()
				} else {
					console.error(`PageBuilder did not provide a onSubmit callback`)
				}
				this._super()
			},
		},
	})
})
