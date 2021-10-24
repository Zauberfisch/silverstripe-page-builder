import React from "react"
import styles from "./AddNewButton.module.scss"
import classnames from "classnames"
import {ToolbarButton} from "./ToolbarButton"
import {Popover, PopoverHeader, PopoverBody} from "reactstrap"
import {PageBuilderContext} from "../../PageBuilderContext"
import {useUniqueId} from "../../utility"

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
	return (
		<div>
			<ToolbarButton iconName="mdiPlusBox" {...{id}} tooltip={ss.i18n._t("ZAUBERFISCH_PAGEBUILDER.Add")} />
			{id ? <Popover placement="bottom" target={id} {...{toggle, isOpen}} popperClassName={classnames({[styles.popoverHidden]: isHidden})}>
				<PopoverHeader>{ss.i18n._t("ZAUBERFISCH_PAGEBUILDER.AddDropdownTitle")}</PopoverHeader>
				<PopoverBody>
					<div className={styles.elements}>
						{Object.entries(elements).map(([key, element]) => {
							return <div {...{key}}>
								{element.craft.related.CreateButton({
									onCreate: () => setIsOpen(false),
									onDragStart: () => {
										if (navigator.userAgent.toLowerCase().indexOf("firefox") > -1) {
											setIsHidden(true)
										} else {
											// in chrome, hiding the parent element to early will cause the drag to be canceled
											setTimeout(() => setIsHidden(true), 1000)
										}
									},
								})}
							</div>
						})}
					</div>
				</PopoverBody>
			</Popover> : null}
		</div>
	)
}


