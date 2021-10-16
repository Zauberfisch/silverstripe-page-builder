import React from "react"
import styles from "./AddNewButton.module.scss"
import classnames from "classnames"
import {ToolbarButton} from "./ToolbarButton"
// import {Dropdown, DropdownMenu, DropdownToggle} from "reactstrap"
import {Popover, PopoverHeader, PopoverBody} from "reactstrap"
import {PageBuilderContext} from "../../PageBuilderContext"
import {useUniqueId} from "../../utility/useUniqueId"

export const AddNewButton = ({}) => {
	const id = useUniqueId()
	const [isOpen, setIsOpen] = React.useState(false)
	const [isHidden, setIsHidden] = React.useState(false)
	const toggle = React.useCallback(() => {
		setIsOpen(_isOpen => {
			if (!_isOpen) {
				setIsHidden(false)
			}
			return !_isOpen
		})
	})
	const {elements} = React.useContext(PageBuilderContext)
	//{id ? <UncontrolledPopover trigger="click" placement="bottom" target={id}>
	return (
		<div>
			<ToolbarButton iconName="mdiPlusBox" {...{id}} />
			{/*style={{display: isHidden ? "hidden" : undefined}}*/}
			{id ? <Popover placement="bottom" target={id} {...{toggle, isOpen}} popperClassName={classnames({[styles.popoverHidden]: isHidden})}>
				<PopoverHeader>{ss.i18n._t("ZAUBERFISCH_PAGEBUILDER.AddDropdownTitle")}</PopoverHeader>
				<PopoverBody>
					<div className={styles.elements}>
						{Object.entries(elements).map(([key, element]) => {
							return <div {...{key}}>
								{element.craft.related.CreateButton({
									onCreate: () => setIsOpen(false),
									onDragStart: () => setIsHidden(true),
								})}
							</div>
						})}
					</div>
				</PopoverBody>
			</Popover> : null}
		</div>
		// <Dropdown isOpen={dropdownOpen} toggle={toggle}>
		// 	<DropdownToggle
		// 		tag="span"
		// 		data-toggle="dropdown"
		// 		aria-expanded={dropdownOpen}
		// 	>
		// 		{/*Custom Dropdown Content*/}
		// 	</DropdownToggle>
		// 	<DropdownMenu>
		// 		<div onClick={toggle}>Custom dropdown item</div>
		// 		<div onClick={toggle}>Custom dropdown item</div>
		// 		<div onClick={toggle}>Custom dropdown item</div>
		// 		<div onClick={toggle}>Custom dropdown item</div>
		// 	</DropdownMenu>
		// </Dropdown>
	)
}


