import React from "react"
import {UnstyledButtonComponent} from "./UnstyledButtonComponent"
import {EmbedModalFile} from "../../../../LinkModals"

export function UnstyledFileSelectComponent({
	                                            buttonTitle,
	                                            buttonOverwrite,
	                                            buttonComponent = UnstyledButtonComponent,
	                                            buttonProps = {},
	                                            disabled = false,
	                                            // children,
	                                            onChange,
	                                            value,
                                            }) {
	const [isOpen, setIsOpen] = React.useState(false)
	const onClosed = React.useCallback(() => {
		setIsOpen(false)
	}, [])
	// TODO we should use propName to bust the cache of React.useCallback
	const onInsert = React.useCallback((data, file) => {
		onChange && onChange(data, file)
		setIsOpen(false)
	}, [])
	// buttonProps.active = dropdownOpen
	return (
		<React.Fragment>
			{buttonOverwrite || React.createElement(buttonComponent, {
				...buttonProps,
				disabled,
				onClick: React.useCallback((e) => {
					e.preventDefault()
					typeof buttonProps.onClick === "function" && buttonProps.onClick(e)
					setIsOpen(true)
				}, []),
				children: buttonTitle,
			})}
			<EmbedModalFile {...{onInsert, onClosed, isOpen, fileAttributes: value}} />
			{/*<pre>{JSON.stringify({value}, null, 2)}</pre>*/}
		</React.Fragment>
	)
}

