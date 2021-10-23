import React from "react"
import {Icon as MdiIconContainer} from "@mdi/react"
import * as MdiIcons from "@mdi/js"

export const Icon = ({iconName, ...props}) => {
	const path = MdiIcons[iconName]
	return (
		<span {...props}>
			<MdiIconContainer path={path}  />
		</span>
	)
}
