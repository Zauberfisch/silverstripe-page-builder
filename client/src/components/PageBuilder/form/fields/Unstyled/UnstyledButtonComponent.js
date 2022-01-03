import React from "react"
import {useUniqueId} from "../../../utility"
import {Tooltip} from "reactstrap"
import classNames from "classnames"

export function UnstyledButtonComponent({
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
	                               onClick,
	                               ...props
                               }) {
	const _id = useUniqueId(id)
	const [tooltipOpen, setTooltipOpen] = React.useState(false)
	const toggleTooltip = React.useCallback(() => setTooltipOpen(_value => !_value), [])
	const onMouseDown = React.useCallback((e) => e.preventDefault(), [])
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
		<React.Fragment>
		{/*<span className={containerClassName} style={containerStyle}>*/}
			<button {...{onMouseDown, ...props, id: _id, disabled, className: classNames(className, {
				[activeClassName]: active,
				[notActiveClassName]: !active,
			}), style, onClick}}>
				{children}
			</button>
			{_id && tooltip ? <Tooltip placement="bottom" isOpen={tooltipOpen} target={_id} toggle={toggleTooltip}>
				{tooltip}
			</Tooltip> : null}
		{/*</span>*/}
		</React.Fragment>
	)
}
