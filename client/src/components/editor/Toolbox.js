import {useEditor, Element} from "@craftjs/core"
import React from "react"

import {Button} from "../user/Button"
import {Container} from "../user/Container"
import {Text} from "../user/Text"

export const Toolbox = () => {
	const {connectors} = useEditor()

	return (
		<div style={{padding: 2, background: "green"}}>
			<div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyItems: "center"}}>
				<div>
					<button
						ref={(ref) => connectors.create(ref, <Button text="Click me" size="small" />)}
					>
						Button
					</button>
				</div>
				<div>
					<button
						ref={(ref) => connectors.create(ref, <Text text="Hi world" />)}
					>
						Text
					</button>
				</div>
				<div>
					<button
						ref={(ref) => connectors.create(ref, <Element canvas is={Container} padding={20} />)}
					>
						Container
					</button>
				</div>
			</div>
		</div>
	)
}
