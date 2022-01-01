import React from "react"
import styles from "./FormButton.module.scss"
import classNames from "classnames"
import {UnstyledButton} from "../Unstyled"
import {TitleWithIcon} from "../../helpers"

// import { Button } from 'reactstrap';

export function FormButton({
	                           tooltip = "",
	                           disabled = false,
	                           active = false,
	                           id,
	                           className = "",
	                           activeClassName = "",
	                           notActiveClassName = "",
	                           containerClassName = "",
	                           containerStyle = {},
	                           style = {},
	                           children,
	                           iconLeft = {},
	                           iconRight = {},
	                           buttonType = "outline-secondary",
	                           activeButtonType = "outline-primary",
	                           ...props
                           }) {

	const allProps = {
		tooltip, disabled, active, id, containerClassName, containerStyle, style,
		...props,
		className: classNames(className, styles.button, `btn`, {[styles.hasText]: React.Children.count(children)}),
		notActiveClassName: classNames(notActiveClassName, styles.notActive, `btn-${buttonType}`),
		activeClassName: classNames(activeClassName, styles.active, `btn-${activeButtonType}`),
		// children: <span className="btn__title">{children}</span>,
	}
	iconLeft.className = classNames(iconLeft.className, styles.icon)
	iconRight.className = classNames(iconLeft.className, styles.icon)
	return (
		<UnstyledButton {...allProps}>
			{/*<button type="submit" name="action_asd" value="asd" id="Form_EditForm_action_asd" className="btn action btn btn-primary">*/}
			{/*	<span className="">asd</span>*/}
			{/*</button>*/}
			<TitleWithIcon {...{children, iconLeft, iconRight, className: "btn__title"}} />
		</UnstyledButton>
	)
}
