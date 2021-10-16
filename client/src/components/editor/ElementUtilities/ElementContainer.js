import React from "react"
import {MoveHandle} from "./MoveHandle"
import classNames from "classnames"
import {useNodeState} from "./useNodeState"
import styles from "./ElementContainer.module.scss"
import {useNode} from "@craftjs/core"

export function ElementContainer({children, className = "", inline = false, ref, ...props}) {
	const {isActive, isHover} = useNodeState()
	const {connectors: {connect}} = useNode()
	if (!props.ref) {
		props.ref = (ref) => connect(ref)
	}
	return <div {...props} className={classNames(className, styles.element, {
		[styles.active]: isActive,
		[styles.hover]: isHover,
		[styles.inline]: inline,
	})}>
		<MoveHandle />
		{children}
	</div>
}