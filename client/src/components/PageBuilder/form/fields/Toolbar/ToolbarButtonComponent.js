import React from "react"
import styles from "./ToolbarButtonComponent.module.scss"
import classNames from "classnames"
import {UnstyledButtonComponent} from "../Unstyled"
import {TitleWithIcon} from "../../helpers"

export function ToolbarButtonComponent({
	                                       tooltip = "",
	                                       disabled = false,
	                                       active = false,
	                                       id,
	                                       className = "",
	                                       activeClassName = "",
	                                       // containerClassName = "",
	                                       // containerStyle = {},
	                                       style = {},
	                                       children,
	                                       iconLeft = {},
	                                       iconRight = {},
	                                       onClick,
	                                       ...props
                                       }) {
	const allProps = {
		tooltip, disabled, active, id, style, onClick,
		...props,
		className: classNames(className, styles.button, {[styles.hasText]: React.Children.count(children)}),
		activeClassName: classNames(activeClassName, styles.active),
	}
	// <span className={containerClassName} style={containerStyle}>
	return (
		<UnstyledButtonComponent {...allProps}>
			<TitleWithIcon {...{
				children,
				iconLeft: {
					...iconLeft,
					className: classNames(iconLeft.className, styles.icon),
				},
				iconRight: {
					...iconRight,
					className: classNames(iconLeft.className, styles.icon),
				},
			}} />
		</UnstyledButtonComponent>
	)
}
