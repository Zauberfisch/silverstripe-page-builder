import React from "react"
import {Icon} from "../../utility/Icon"
import {ToolbarDropdown} from "./ToolbarDropdown"
import {DropdownItem} from "reactstrap"

const ToolbarSelectItem = ({onClick, onChange, title, iconName, style = {}, ...props}) => {
	const onMouseDown = React.useCallback((e) => e.preventDefault(), [])
	const _onClick = React.useCallback((e) => {
		e.preventDefault()
		typeof onClick === "function" && onClick(e)
		onChange(props.value)
	}, [props.value])
	return <DropdownItem {...props} onMouseDown={onMouseDown} onClick={_onClick} style={{padding: "0 10px", ...style}}>
		{iconName ? <Icon style={{width: 20, display: "inline-block", padding: "0 5px 0 0"}} iconName={iconName} /> : null}
		<span>{title}</span>
	</DropdownItem>
}

export const ToolbarSelect = ({options, value, onChange, showSelectedTitle = true, showSelectedIcon = true, ...props}) => {
	const selected = options.find(({value: _value}) => value === _value) || {}
	return (
		<ToolbarDropdown {...props} title={showSelectedTitle && selected && selected.title} iconName={showSelectedIcon && selected && selected.iconName}>
			{options && options.map(option => {
				return <ToolbarSelectItem {...option} active={option.value === value} onChange={onChange} />
			})}
		</ToolbarDropdown>
	)
}
