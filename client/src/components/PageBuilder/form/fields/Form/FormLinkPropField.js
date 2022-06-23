import React from "react"
import {FormFieldGroup} from "./FormFieldGroup"
import {useUniqueId} from "../../../utility"
import {FormTextComponent} from "./FormTextComponent"
import {FormButtonComponent} from "./FormButtonComponent"
import {FormLinkSelectComponent} from "./FormLinkSelectComponent"

export function FormLinkPropField({
	                                  elementProp,
	                                  label,
	                                  // buttonTitle,
	                                  // buttonProps = {},
	                                  disabled = false,
	                                  canEditAsText = false,
                                  }) {
	// FIXME canEditAsText
	const id = useUniqueId()
	return (
		<FormFieldGroup label={label} labelFor={id} className={"fieldgroup"} innerClassName={"form__fieldgroup"}>
			<div className="input-group">
				<FormTextComponent value={JSON.stringify(elementProp.value.file && elementProp.value.file.url ? {
					Link: elementProp.value.file.url,
					Description: elementProp.value.data.Description,
					TargetBlank: elementProp.value.data.TargetBlank,
				} : elementProp.value.data)} onChange={canEditAsText ? elementProp.changeHandler : undefined} disabled={!canEditAsText} />
				<FormLinkSelectComponent {...{
					onChange: elementProp.changeHandler,
					linkTypes: elementProp.linkTypes,
					value: elementProp.value,
					disabled,
					id,
				}} />
				{elementProp.hasValue ? <span className="input-group-append">
					<FormButtonComponent children={"Remove"} onClick={elementProp.clearHandler} />
				</span> : null}
			</div>
		</FormFieldGroup>
	)
}

// export function FormLinkPropField({
// 	                                  elementProp,
// 	                                  label,
// 	                                  // buttonTitle,
// 	                                  // buttonProps = {},
// 	                                  disabled = false,
//                                   }) {
// 	const id = useUniqueId()
// 	return (
// 		<FormFieldGroup label={label} labelFor={id} className={"fieldgroup"} innerClassName={"form__fieldgroup"}>
// 			<div className="input-group">
// 				<FormTextComponent value={JSON.stringify(elementProp.value.file && elementProp.value.file.url ? {
// 					Link: elementProp.value.file.url,
// 					Description: elementProp.value.data.Description,
// 					TargetBlank: elementProp.value.data.TargetBlank,
// 				} : elementProp.value.data)} disabled={true} />
// 				<FormLinkSelectComponent {...{elementProp, disabled, id}} />
// 				{elementProp.hasValue ? <span className="input-group-append">
// 					<FormButtonComponent children={"Remove"} onClick={elementProp.clearHandler} />
// 				</span> : null}
// 			</div>
// 		</FormFieldGroup>
// 	)
// }


// export function FormLinkPropField({
// 	                                  elementProp,
// 	                                  label,
// 	                                  // buttonTitle,
// 	                                  // buttonProps = {},
// 	                                  disabled = false,
//                                   }) {
// 	const id = useUniqueId()
// 	const [isOpen, setIsOpen] = React.useState(false)
// 	const addLink = React.useCallback((e) => {
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
// 		<FormFieldGroup label={label} labelFor={id} className={"fieldgroup"} innerClassName={"form__fieldgroup"}>
// 			<div className="input-group">
// 				<FormTextComponent value={JSON.stringify(elementProp.value.file && elementProp.value.file.url ? {
// 					Link: elementProp.value.file.url,
// 					Description: elementProp.value.data.Description,
// 					TargetBlank: elementProp.value.data.TargetBlank,
// 				} : elementProp.value.data)} disabled={true} />
// 				{elementProp.hasValue ? null : <span className="input-group-append">
// 					<FormDropdownComponent buttonProps={{
// 						children: "Link",
// 						iconRight: {iconName: "mdiMenuDown"},
// 					}}>
// 						{elementProp.linkTypes.map(linkType => {
// 							return (
// 								<React.Fragment key={linkType.id}>
// 									<UnstyledDropdownItemComponent data-modalid={linkType.id} onClick={addLink}>
// 										{linkType.title}
// 									</UnstyledDropdownItemComponent>
// 								</React.Fragment>
// 							)
// 						})}
// 					</FormDropdownComponent>
// 				</span>}
// 				{elementProp.hasValue ? <span className="input-group-append">
// 					<FormButtonComponent children={`Edit ${elementProp.linkType}`} data-modalid={elementProp.linkType} onClick={addLink} />
// 				</span> : null}
// 				{elementProp.hasValue ? <span className="input-group-append">
// 					<FormButtonComponent children={"Remove"} onClick={elementProp.clearHandler} />
// 				</span> : null}
// 			</div>
// 			{elementProp.linkTypes.map(linkType => {
// 				// TODO always rendering the modals and just controlling isOpen lead to a bug where the 2nd time you open a modal, the first one would open as well or something
// 				return (
// 					<React.Fragment key={linkType.id}>
// 						{isOpen && elementProp.linkType === linkType.id ? React.createElement(linkType.component, {fileAttributes: elementProp.value.data, onInsert, onClosed, isOpen: true}) : null}
// 					</React.Fragment>
// 				)
// 			})}
// 			{/*<pre>{JSON.stringify([elementProp.linkType, elementProp.value], null, 2)}</pre>*/}
// 		</FormFieldGroup>
// 	)
// }
