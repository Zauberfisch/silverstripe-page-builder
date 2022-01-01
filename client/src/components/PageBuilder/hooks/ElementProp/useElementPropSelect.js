import {useElementPropString} from "./useElementPropString"
import React from "react"

export function useElementPropSelect(props, propName, options) {
	const {value, changeHandler, clearHandler} = useElementPropString(props, propName)
	const _options = options || []
	return {
		value,
		options: _options,
		fullValue: _options.find(obj => obj.value === value) || {}, //{pageBuilderStyle: {}},
		changeHandler,
		clearHandler,
	}
}

