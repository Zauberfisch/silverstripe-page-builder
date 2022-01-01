import React from "react"
import {Icon} from "components/PageBuilder/utility"

export function TitleWithIcon({children, iconLeft, iconRight, className}) {
	return (
		<React.Fragment>
			{iconLeft && iconLeft.iconName ? <Icon {...iconLeft} /> : null}
			{React.Children.count(children) ? <span className={className}>{children}</span> : null}
			{iconRight && iconRight.iconName ? <Icon {...iconRight} /> : null}
		</React.Fragment>
	)
}
