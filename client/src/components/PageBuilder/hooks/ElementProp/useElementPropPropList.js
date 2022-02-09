// import React from "react"
// import {useNode} from "@craftjs/core"
//
// export function useElementPropPropList(props, propName) {
// 	const value = !props[propName] || !Array.isArray(props[propName]) ? props[propName] : []
// 	const {actions: {setProp}} = useNode()
// 	// const changeHandler = React.useCallback(e => {
// 	// 	const val = e.currentTarget.value
// 	// 	let safeVal = JSON.parse(JSON.stringify(val))
// 	// 	safeVal = Array.isArray(safeVal) ? safeVal : []
// 	// 	setProp((_props) => {
// 	// 		// eslint-disable-next-line no-param-reassign
// 	// 		_props[propName] = safeVal
// 	// 	}, 500)
// 	// }, [propName])
// 	const addItemHandler = React.useCallback(value => {
// 		let safeVal = JSON.parse(JSON.stringify(value))
// 		// safeVal = Array.isArray(safeVal) ? safeVal : []
// 		setProp((_props) => {
// 			// eslint-disable-next-line no-param-reassign
// 			if (!_props[propName] || !Array.isArray(_props[propName])) {
// 				_props[propName] = []
// 			}
// 			_props[propName].push(safeVal)
// 		})
// 	}, [propName])
// 	// const changeItemHandler = React.useCallback((index, value) => {
// 	// 	let safeVal = JSON.parse(JSON.stringify(value))
// 	// 	setProp((_props) => {
// 	// 		// eslint-disable-next-line no-param-reassign
// 	// 		if (!_props[propName] || !Array.isArray(_props[propName])) {
// 	// 			_props[propName] = []
// 	// 		}
// 	// 		if (index > 0 && index < _props[propName].length) {
// 	// 			_props[propName][index] = safeVal
// 	// 		}
// 	// 	}, 500)
// 	// }, [propName])
// 	const changeItemHandlerObjectValue = React.useCallback((index, key, value) => {
// 		let safeVal = JSON.parse(JSON.stringify(typeof value?.currentTarget?.value !== "undefined" ? value.currentTarget.value : value))
// 		setProp((_props) => {
// 			// eslint-disable-next-line no-param-reassign
// 			if (!_props[propName] || !Array.isArray(_props[propName])) {
// 				_props[propName] = []
// 			}
// 			if (index > 0 && index < _props[propName].length) {
// 				if (typeof _props[propName][index] !== "object") {
// 					_props[propName][index] = {}
// 				}
// 				_props[propName][index][key] = safeVal
// 			}
// 		}, 500)
// 	}, [propName])
// 	const removeItemHandler = React.useCallback((index) => {
// 		setProp((_props) => {
// 			// eslint-disable-next-line no-param-reassign
// 			if (!_props[propName] || !Array.isArray(_props[propName])) {
// 				_props[propName] = []
// 			}
// 			if (index >= 0 && index < _props[propName].length) {
// 				const newValue = JSON.parse(JSON.stringify(_props[propName]))
// 				newValue.splice(index, 1)
// 				_props[propName] = newValue
// 			}
// 		})
// 	}, [propName])
// 	const moveItemHandler = React.useCallback((index, newIndex) => {
// 		setProp((_props) => {
// 			// eslint-disable-next-line no-param-reassign
// 			if (!_props[propName] || !Array.isArray(_props[propName])) {
// 				_props[propName] = []
// 			}
// 			if (index >= 0 && index < _props[propName].length && newIndex >= 0 && newIndex < _props[propName].length) {
// 				const newValue = JSON.parse(JSON.stringify(_props[propName]))
// 				newValue.splice(newIndex, 0, newValue.splice(index, 1)[0])
// 				_props[propName] = newValue
// 			}
// 		})
// 	}, [propName])
// 	const clearHandler = React.useCallback(() => {
// 		setProp((_props) => {
// 			// eslint-disable-next-line no-param-reassign
// 			_props[propName] = []
// 		})
// 	}, [propName])
// 	return {
// 		value,
// 		addItemHandler,
// 		changeItemHandler,
// 		changeItemObjectValueHandler,
// 		removeItemHandler,
// 		moveItemHandler,
// 		clearHandler,
// 	}
// }
//
