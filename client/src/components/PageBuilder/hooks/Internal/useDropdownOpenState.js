import React from "react"

export function useDropdownOpenState(previousOnOpen) {
	const [dropdownOpen, setDropdownOpen] = React.useState(false)
	const onOpen = React.useCallback((newState) => {
		setDropdownOpen(newState)
		previousOnOpen && previousOnOpen()
	}, [])
	return [dropdownOpen, onOpen]
}
