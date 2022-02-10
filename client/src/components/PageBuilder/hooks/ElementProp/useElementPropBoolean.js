import React from "react"
import {ElementPropHelper} from "./ElementPropHelper"

export function useElementPropBoolean(props, propName) {
	return ElementPropHelper.useElementProp(props, propName, ElementPropHelper.CREATE_TYPE_BOOLEAN())
}
