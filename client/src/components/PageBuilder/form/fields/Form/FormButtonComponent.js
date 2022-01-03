import React from "react"
import styles from "./FormButton.module.scss"
import classNames from "classnames"
import {UnstyledButtonComponent} from "../Unstyled"
import {TitleWithIcon} from "../../helpers"

export function FormButtonComponent({
	                                    tooltip = "",
	                                    disabled = false,
	                                    active = false,
	                                    id,
	                                    className = "",
	                                    activeClassName = "",
	                                    notActiveClassName = "",
	                                    // containerClassName = "",
	                                    // containerStyle = {},
	                                    style = {},
	                                    children,
	                                    iconLeft = {},
	                                    iconRight = {},
	                                    buttonType = "outline-secondary",
	                                    activeButtonType = "outline-primary",
	                                    ...props
                                    }) {
	const allProps = {
		tooltip, disabled, active, id, style,
		...props,
		className: classNames(className, styles.button, `btn`, {[styles.hasText]: React.Children.count(children)}),
		notActiveClassName: classNames(notActiveClassName, styles.notActive, `btn-${buttonType}`),
		activeClassName: classNames(activeClassName, styles.active, `btn-${activeButtonType}`),
		// children: <span className="btn__title">{children}</span>,
	}
	//{/*<span className={containerClassName} style={containerStyle}>*/}
	return (
		<UnstyledButtonComponent {...allProps}>
			{/*<button type="submit" name="action_asd" value="asd" id="Form_EditForm_action_asd" className="btn action btn btn-primary">*/}
			{/*	<span className="">asd</span>*/}
			{/*</button>*/}
			<TitleWithIcon {...{
				children,
				className: "btn__title",
				iconLeft: {
					...iconLeft,
					className: classNames(iconLeft.className, styles.icon),
				},
				iconRight: {
					...iconRight,
					className: classNames(iconRight.className, styles.icon),
				},
			}} />
		</UnstyledButtonComponent>
	)
}
