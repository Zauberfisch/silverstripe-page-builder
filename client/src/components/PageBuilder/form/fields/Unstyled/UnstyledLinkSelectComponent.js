import React, {createElement} from "react"
import {useUniqueId} from "../../../utility"
import {UnstyledButtonComponent, UnstyledDropdownComponent, UnstyledDropdownItemComponent} from "../Unstyled"

export function UnstyledLinkSelectComponent({
	                                            onChange,
	                                            onChangeType,
	                                            linkTypes = [],
	                                            linkTypeValue = "",
	                                            value = {},
	                                            buttonComponent = UnstyledButtonComponent,
	                                            dropdownComponent = UnstyledDropdownComponent,
	                                            addDropDownProps: _addDropDownProps = {},
	                                            editButtonProps = {},
	                                            disabled = false,
	                                            id: _id,
                                            }) {
	const id = useUniqueId(_id)
	const {buttonProps: addDropDownButtonProps, ...addDropDownProps} = _addDropDownProps
	const [isOpen, setIsOpen] = React.useState(false)
	const onClick = React.useCallback((e) => {
		// elementProp.changeTypeHandler(e.currentTarget.dataset.modalid)
		if (e.currentTarget.dataset.modalid !== "edit") {
			onChangeType(e.currentTarget.dataset.modalid)
		}
		setIsOpen(true)
	}, [])
	// TODO refactor out into unstyled component
	const onClosed = React.useCallback(() => {
		setIsOpen(false)
	}, [])
	const onInsert = React.useCallback((data, file) => {
		// elementProp.changeHandler(data, file)
		onChange(data, file)
		setIsOpen(false)
	}, [])
	const hasValue = !!(value && typeof value.data === "object" && linkTypes.find((linkType) => linkType.id === linkTypeValue))
	return (
		<React.Fragment>
			{linkTypes.map(linkType => {
				// TODO always rendering the modals and just controlling isOpen lead to a bug where the 2nd time you open a modal, the first one would open as well or something
				return (
					<React.Fragment key={linkType.id}>
						{isOpen && linkTypeValue === linkType.id ? React.createElement(linkType.component, {fileAttributes: value.data, onInsert, onClosed, isOpen: true}) : null}
					</React.Fragment>
				)
			})}
			{hasValue ?
				React.createElement(buttonComponent, {
					children: "Edit Link",
					...editButtonProps,
					id,
					onClick,
					disabled,
					"data-modalid": "edit",
				})
				:
				React.createElement(dropdownComponent, {
					buttonProps: {
						children: "Add Link",
						iconRight: {iconName: "mdiMenuDown"},
						onClick,
						...addDropDownButtonProps,
					},
					...addDropDownProps,
					id,
					disabled,
					children: linkTypes.map(linkType => {
						return (
							<React.Fragment key={linkType.id}>
								<UnstyledDropdownItemComponent data-modalid={linkType.id} onClick={onClick}>
									{linkType.title}
								</UnstyledDropdownItemComponent>
							</React.Fragment>
						)
					}),
				})}
		</React.Fragment>
	)
}
