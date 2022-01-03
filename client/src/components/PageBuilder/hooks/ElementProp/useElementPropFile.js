import React from "react"
import {useNode} from "@craftjs/core"

export function useElementPropFile(props, propName) {
	const value = props[propName] || {}
	const {actions: {setProp}} = useNode()
	// const changeHandler = React.useCallback(e => {
	// 	const val = e.target.value
	// 	setProp((_props) => {
	// 		// eslint-disable-next-line no-param-reassign
	// 		_props[propName] = val
	// 	}, 500)
	// }, [propName])
	// const clearHandler = React.useCallback(() => {
	// 	setProp((_props) => {
	// 		// eslint-disable-next-line no-param-reassign
	// 		_props[propName] = ""
	// 	})
	// }, [propName])

	// const [modalOpen, setModalOpen] = React.useState(false)
	// const addHandler = React.useCallback(() => {
	// 	setModalOpen(true)
	// }, [propName])
	const clearHandler = React.useCallback(() => {
		setProp((_props) => {
			// eslint-disable-next-line no-param-reassign
			_props[propName] = null
		})
	}, [propName])
	// const insertHandler = React.useCallback((data, file) => {
	const changeHandler = React.useCallback((fileData) => {
		setProp((_props) => {
			// eslint-disable-next-line no-param-reassign
			_props[propName] = fileData
		})
		// setModalOpen(false)
	}, [propName])
	// const closeHandler = React.useCallback(() => setModalOpen(false), [propName])
	const hasValue = !!(value && typeof value.data === "object" && typeof value.file === "object")
	const _value = hasValue ? value : {}
	return {
		value: _value,
		// modalOpen,
		hasValue,
		fileName: hasValue ? _value.data.FileFilename : null,
		url: hasValue ? _value.file.thumbnail : null,
		changeHandler,
		clearHandler,
		// insertHandler,
		// closeHandler,
	}
}
