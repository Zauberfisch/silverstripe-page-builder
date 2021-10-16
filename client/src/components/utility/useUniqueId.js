import React from "react"
import {nanoid} from "nanoid"

export function useUniqueId() {
	// TODO switch to using React.createRef() for bootstrap components instead of an ID once that is working
	const [id, setId] = React.useState()
	React.useEffect(() => {
		const _id = `page-builder-id-${nanoid()}`
		setId(_id)
	}, [])
	return id
}
