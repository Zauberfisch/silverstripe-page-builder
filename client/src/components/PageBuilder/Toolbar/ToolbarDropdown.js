import React from "react"
import {Dropdown, DropdownMenu, DropdownToggle} from "reactstrap"
import {ToolbarButton} from "./ToolbarButton"

export const ToolbarDropdown = ({title = "", iconName, iconStyle = {}, disabled = false, children, ...props}) => {
	const [dropdownOpen, setDropdownOpen] = React.useState(false)
	const toggle = () => setDropdownOpen(prevState => !prevState)
	return (
		<Dropdown isOpen={dropdownOpen} toggle={toggle}>
			<DropdownToggle tag="span">
				<ToolbarButton {...{...props, title, iconName, iconStyle, iconNameRight: dropdownOpen ? "mdiMenuUp" : "mdiMenuDown", disabled, active: dropdownOpen}} />
			</DropdownToggle>
			<DropdownMenu>
				{children}
			</DropdownMenu>
		</Dropdown>
	)
}
