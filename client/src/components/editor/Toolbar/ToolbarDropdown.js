import styles from "./ToolbarDropdown.module.scss"
import React from "react"
import classNames from "classnames"
import {Dropdown, DropdownMenu, DropdownToggle, DropdownItem} from "reactstrap"
import {ToolbarButton} from "./ToolbarButton"

const ToolbarSelectItem = ({onClick, onChange, title, ...props}) => {
	const _onClick = React.useCallback((e) => {
		e.preventDefault()
		typeof onClick === "function" && onClick(e)
		onChange(props.value)
	}, [props.value])
	return <DropdownItem {...props} onClick={_onClick}>{title}</DropdownItem>
}

export const ToolbarSelect = ({options, value, onChange, children, title, ...props}) => {
	const _title = options.find(({value: _value}) => value === _value)
	return (
		<ToolbarDropdown {...props} title={_title ? _title.title : "xxx"}>
			{options && options.map(option => {
				return <ToolbarSelectItem {...option} active={option.value === value} onChange={onChange} />
			})}
		</ToolbarDropdown>
	)
}

export const ToolbarMultiSelect = () => {
	return (
		<ToolbarDropdown></ToolbarDropdown>
	)
}

export const ToolbarDropdown = ({title = "", className, disabled = false, children}) => {
	const [dropdownOpen, setDropdownOpen] = React.useState(false)
	const toggle = () => setDropdownOpen(prevState => !prevState)
	return (
		<Dropdown isOpen={dropdownOpen} toggle={toggle}>
			<DropdownToggle tag="span">
				<ToolbarButton title={title} disabled={disabled} active={dropdownOpen} />
			</DropdownToggle>
			<DropdownMenu>
				{children}
			</DropdownMenu>
		</Dropdown>
	)
	// return (
	// 	<span>
	// 		<button {...{onChange, id, disabled}} className={classNames(styles.button, className, {[styles.active]: active, [styles.hasText]: title})}>
	// 		</button>
	// 		{id && tooltip ? <UncontrolledTooltip placement="bottom" target={id}>{tooltip}</UncontrolledTooltip> : null}
	// 	</span>
	// )
}
