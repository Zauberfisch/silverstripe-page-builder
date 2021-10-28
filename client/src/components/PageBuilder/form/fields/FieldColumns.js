import React from "react"
import classNames from "classnames"
import styles from "./FieldColumns.module.scss"

export function FieldColumns({children, className, ...props}) {
	return (
		<div className={classNames(className, styles.container)} {...props}>
			{children}
		</div>
	)
}
