import React from "react"
import styles from "./ToolbarButton.module.scss"
import classNames from "classnames"
import {Tooltip} from "reactstrap"
import {useUniqueId, Icon} from "components/PageBuilder/utility"

export const ToolbarButton = ({title = "", tooltip = "", iconName, iconStyle = {}, iconNameRight, iconStyleRight = {}, active = false, disabled = false, id, className = "", ...props}) => {
	const _id = useUniqueId()
	const [tooltipOpen, setTooltipOpen] = React.useState(false)
	const toggleTooltip = React.useCallback(() => setTooltipOpen(_value => !_value), [])
	const onMouseDown = React.useCallback((e) => e.preventDefault(), [])
	id = id || _id
	const refTimeout = React.useRef()
	React.useEffect(() => {
		if (tooltipOpen) {
			if (refTimeout.current) {
				clearTimeout(refTimeout.current)
			}
			refTimeout.current = setTimeout(() => setTooltipOpen(false), 3000)
		} else {
			if (refTimeout.current) {
				clearTimeout(refTimeout.current)
			}
		}
	}, [tooltipOpen])
	return (
		<span>
			<button {...{onMouseDown, ...props, id, disabled}} className={classNames(styles.button, className, {[styles.active]: active, [styles.hasText]: title})}>
				{iconName ? <Icon className={styles.icon} iconName={iconName} style={iconStyle} /> : null}
				{title ? <span className={styles.title}>
					<span>{title}</span>
				</span> : null}
				{iconNameRight ? <Icon className={styles.icon} iconName={iconNameRight} style={iconStyleRight} /> : null}
			</button>

			{id && tooltip ? <Tooltip placement="bottom" isOpen={tooltipOpen} target={id} toggle={toggleTooltip}>
				{tooltip}
			</Tooltip> : null}
		</span>
	)
}
