import React from "react"
import {Modal, ModalHeader, ModalBody, ModalFooter, Button} from "reactstrap"
import {FormButtonComponent} from "../form"

export function EditFormModal({isOpen, title, onClickClose, children, footerChildren, closeTitle}) {
	return (
		<Modal isOpen={isOpen} toggle={onClickClose}>
			<ModalHeader toggle={onClickClose}>
				{title}
			</ModalHeader>
			<ModalBody>
				<div style={{overflow: "auto", maxHeight: "70vh"}}>
					{children}
				</div>
			</ModalBody>
			{React.Children.count(footerChildren) > 0 || closeTitle ? <ModalFooter>
				{footerChildren}
				{closeTitle ? <Button color="success" onClick={onClickClose}>{closeTitle}</Button> : null}
			</ModalFooter> : null}
		</Modal>
	)
}

export function EditFormModalWithButton({buttonTitle = "Edit", title, buttonProps, children, footerChildren, closeTitle}) {
	const [isOpen, setIsOpen] = React.useState(false)
	const toggleModal = React.useCallback(() => setIsOpen(oldVal => !oldVal), [])
	return (
		<React.Fragment>
			<FormButtonComponent {...buttonProps} onClick={toggleModal}>{buttonTitle}</FormButtonComponent>
			<EditFormModal isOpen={isOpen} title={title} children={children} footerChildren={footerChildren} onClickClose={toggleModal} closeTitle={closeTitle} />
		</React.Fragment>
	)
}
