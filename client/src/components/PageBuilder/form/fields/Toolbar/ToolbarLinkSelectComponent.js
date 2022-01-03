import React from "react"
import {UnstyledLinkSelectComponent} from "../Unstyled/UnstyledLinkSelectComponent"
import {ToolbarButtonComponent} from "./ToolbarButtonComponent"
import {ToolbarDropdownComponent} from "./ToolbarDropdownComponent"

export function ToolbarLinkSelectComponent({
	                                        onChange,
	                                        onChangeType,
	                                        linkTypes,
	                                        linkTypeValue = "",
	                                        value = {},
	                                        addDropDownProps = {},
	                                        editButtonProps = {},
	                                        disabled = false,
	                                        id,
                                        }) {


	return (
		<UnstyledLinkSelectComponent {...{
			onChange,
			onChangeType,
			linkTypes,
			linkTypeValue,
			value,
			buttonComponent: ToolbarButtonComponent,
			dropdownComponent: ToolbarDropdownComponent,
			addDropDownProps,
			editButtonProps,
			// addDropDownProps: _addDropDownProps = {},
			// editButtonProps = {},
			disabled,
			id,
		}} />
	)
}

// export function FormLinkSelectComponent({
// 	                                        elementProp,
// 	                                        editButtonProps = {},
// 	                                        addButtonProps = {},
// 	                                        disabled = false,
// 	                                        id: _id,
//                                         }) {
// 	const id = useUniqueId(_id)
// 	const [isOpen, setIsOpen] = React.useState(false)
// 	const onClick = React.useCallback((e) => {
// 		elementProp.changeTypeHandler(e.currentTarget.dataset.modalid)
// 		setIsOpen(true)
// 	}, [elementProp.propName])
// 	// TODO refactor out into unstyled component
// 	const onClosed = React.useCallback(() => {
// 		setIsOpen(false)
// 	}, [elementProp.propName])
// 	const onInsert = React.useCallback((data, file) => {
// 		elementProp.changeHandler(data, file)
// 		setIsOpen(false)
// 	}, [elementProp.propName])
//
// 	return (
// 		<React.Fragment>
// 			{elementProp.linkTypes.map(linkType => {
// 				// TODO always rendering the modals and just controlling isOpen lead to a bug where the 2nd time you open a modal, the first one would open as well or something
// 				return (
// 					<React.Fragment key={linkType.id}>
// 						{isOpen && elementProp.linkType === linkType.id ? React.createElement(linkType.component, {fileAttributes: elementProp.value.data, onInsert, onClosed, isOpen: true}) : null}
// 					</React.Fragment>
// 				)
// 			})}
// 			{elementProp.hasValue ?
// 				<FormButtonComponent {...{children: "Edit Link", ...editButtonProps, id, onClick, disabled}} data-modalid={elementProp.linkType} />
// 				:
// 				<FormDropdownComponent buttonProps={{
// 					children: "Add Link",
// 					iconRight: {iconName: "mdiMenuDown"},
// 					...addButtonProps,
// 					disabled,
// 					id,
// 				}}>
// 					{elementProp.linkTypes.map(linkType => {
// 						return (
// 							<React.Fragment key={linkType.id}>
// 								<UnstyledDropdownItemComponent data-modalid={linkType.id} onClick={onClick}>
// 									{linkType.title}
// 								</UnstyledDropdownItemComponent>
// 							</React.Fragment>
// 						)
// 					})}
// 				</FormDropdownComponent>
// 			}
// 		</React.Fragment>
// 	)
// }
