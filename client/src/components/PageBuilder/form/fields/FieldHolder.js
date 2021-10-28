import React from "react"

export function FieldHolder({children, style, ...props}) {
	return (
		<div style={{maxWidth: 400, margin: "5px 0", ...style}} {...props}>
			{children}
		</div>
	)
}
