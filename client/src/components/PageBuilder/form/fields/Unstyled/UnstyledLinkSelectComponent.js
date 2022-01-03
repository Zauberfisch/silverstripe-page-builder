import React, {createElement} from "react"
import {useUniqueId} from "../../../utility"
import {UnstyledButtonComponent, UnstyledDropdownComponent, UnstyledDropdownItemComponent} from "../Unstyled"

export function UnstyledLinkSelectComponent({
	                                            onChange,
	                                            linkTypes = [],
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
	const [openModalId, setOpenModalId] = React.useState(null)
	const onClick = React.useCallback((e) => {
		// elementProp.changeTypeHandler(e.currentTarget.dataset.modalid)
		// if (e.currentTarget.dataset.modalid !== "edit") {
		// 	onChangeType()
		// }
		setOpenModalId(e.currentTarget.dataset.modalid)
	}, [])
	// TODO refactor out into unstyled component
	const onClosed = React.useCallback(() => {
		setOpenModalId(null)
	}, [])
	const onInsert = React.useCallback((data, file) => {
		// elementProp.changeHandler(data, file)
		onChange({data, file, linkType: openModalId})
		setOpenModalId(null)
	}, [openModalId])
	const hasValue = !!(value && typeof value.data === "object" && linkTypes.find((linkType) => linkType.id === value.linkType))
	return (
		<React.Fragment>
			{linkTypes.map(linkType => {
				// TODO always rendering the modals and just controlling isOpen lead to a bug where the 2nd time you open a modal, the first one would open as well or something
				return (
					<React.Fragment key={linkType.id}>
						{openModalId === linkType.id ? React.createElement(linkType.component, {fileAttributes: value.data, onInsert, onClosed, isOpen: true}) : null}
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
					"data-modalid": value.linkType,
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
