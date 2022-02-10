import React from "react"
import {Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap"
import {FormButtonComponent} from "../form"

export function EditFormModal({isOpen, onClickClose, children, footerChildren}) {
	return (
		<Modal isOpen={isOpen} toggle={onClickClose}>
			<ModalHeader toggle={onClickClose}>
				Buttons
			</ModalHeader>
			<ModalBody>
				<div style={{overflow: "auto", maxHeight: "70vh"}}>
					{children}
				</div>
			</ModalBody>
			{React.Children.count(footerChildren) > 0 ? <ModalFooter>
				{footerChildren}
			</ModalFooter> : null}
		</Modal>
	)
}

export function EditFormModalWithButton({buttonTitle = "Edit", buttonProps, children, footerChildren}) {
	const [isOpen, setIsOpen] = React.useState(false)
	const toggleModal = React.useCallback(() => setIsOpen(oldVal => !oldVal), [])
	return (
		<React.Fragment>
			<FormButtonComponent {...buttonProps} onClick={toggleModal}>{buttonTitle}</FormButtonComponent>
			<EditFormModal isOpen={isOpen} children={children} footerChildren={footerChildren} onClickClose={toggleModal} />
		</React.Fragment>
	)
}
