import React from "react"
import styles from "./ToolbarButton.module.scss"
import classNames from "classnames"
import {UncontrolledTooltip} from "reactstrap"
import {useUniqueId, Icon} from "components/PageBuilder/utility"

export const ToolbarButton = ({title = "", tooltip = "", iconName, iconStyle = {}, iconNameRight, iconStyleRight = {}, active = false, disabled = false, id, className = "", ...props}) => {
	const onMouseDown = React.useCallback((e) => e.preventDefault(), [])
	const _id = useUniqueId()
	id = id || _id
	return (
		<span>
			<button {...{onMouseDown, ...props, id, disabled}} className={classNames(styles.button, className, {[styles.active]: active, [styles.hasText]: title})}>
				{iconName ? <Icon className={styles.icon} iconName={iconName} style={iconStyle} /> : null}
				{title ? <span className={styles.title}>
					<span>{title}</span>
				</span> : null}
				{iconNameRight ? <Icon className={styles.icon} iconName={iconNameRight} style={iconStyleRight} /> : null}
			</button>
			{id && tooltip ? <UncontrolledTooltip placement="bottom" target={id}>{tooltip}</UncontrolledTooltip> : null}
		</span>
	)
}
