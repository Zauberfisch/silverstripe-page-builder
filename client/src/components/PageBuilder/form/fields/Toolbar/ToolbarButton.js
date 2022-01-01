import React from "react"
import styles from "./ToolbarButton.module.scss"
import classNames from "classnames"
import {UnstyledButton} from "../Unstyled"
import {TitleWithIcon} from "../../helpers"

export function ToolbarButton({
	                              tooltip = "",
	                              disabled = false,
	                              active = false,
	                              id,
	                              className = "",
	                              activeClassName = "",
	                              containerClassName = "",
	                              containerStyle = {},
	                              style = {},
	                              children,
	                              iconLeft = {},
	                              iconRight = {},
	                              onClick,
	                              ...props
                              }) {
	const allProps = {
		tooltip, disabled, active, id, containerClassName, containerStyle, style, onClick,
		...props,
		className: classNames(className, styles.button, {[styles.hasText]: React.Children.count(children)}),
		activeClassName: classNames(activeClassName, styles.active),
	}
	iconLeft.className = classNames(iconLeft.className, styles.icon)
	iconRight.className = classNames(iconLeft.className, styles.icon)
	return (
		<span className={containerClassName} style={containerStyle}>
			<UnstyledButton {...allProps}>
				<TitleWithIcon {...{children, iconLeft, iconRight}} />
			</UnstyledButton>
		</span>
	)
}
