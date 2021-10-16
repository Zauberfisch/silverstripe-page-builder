import React from "react"
import {Icon as MdiIconContainer} from "@mdi/react"
import * as MdiIcons from "@mdi/js"

export const Icon = ({iconName, ...props}) => {
	// const IconComponent = HeroIcons[iconName]
	// size={1} color="red"
	const path = MdiIcons[iconName]
	return (
		<span {...props}>
			<MdiIconContainer path={path}  />
			{/*{IconComponent && <IconComponent style={{width: '100%'}} />}*/}
		</span>
	)
}
