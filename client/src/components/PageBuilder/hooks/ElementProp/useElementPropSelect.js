import React from "react"
import {ElementPropHelper} from "./ElementPropHelper"

export function useElementPropSelect(props, propName, options) {
	return ElementPropHelper.useElementProp(props, propName, ElementPropHelper.CREATE_TYPE_SELECT_STRING(options))
}
