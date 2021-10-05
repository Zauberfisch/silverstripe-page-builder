// import fieldHolder from "components/FieldHolder/FieldHolder"
// import Injector from "lib/Injector"
// import fetch from "isomorphic-fetch"
// import url from "url"
// import debounce from "debounce-promise"
// import PropTypes from "prop-types"

import React from "react"
import {Editor, Frame, Element} from "@craftjs/core"

import {SettingsPanel} from "./editor/SettingsPanel"
import {Toolbox} from "./editor/Toolbox"
import {Topbar} from "./editor/Topbar"
import {Button} from "./user/Button"
// import {Card, CardBottom, CardTop} from "./user/Card"
import {Container} from "./user/Container"
import {Text} from "./user/Text"
import {RenderNode} from "./editor/RenderNode"


function PageBuilderField() {
	// const FooComponent = Injector.component.get("Foo")
	return (
		<div className="page-container">
			<Editor
				resolver={{
					// Card,
					// CardTop,
					// CardBottom,
					Button,
					Text,
					Container,
					// FooComponent,
				}}
				onRender={RenderNode}
			>
				<Topbar />
				<Frame>
					{/*<Element canvas is={Container} padding={15} background="red" />*/}
					<Element
						canvas
						is={Container}
						padding={5}
						background="#eeeeee"
					>
						{/*<FooComponent />*/}
						<Text fontSize={20} text="test" data-cy="frame-text" />
						{/*<Card data-cy="frame-card" />*/}
						{/*<Button text="Click me" size="small" data-cy="frame-button" />*/}
						{/*<Text fontSize={20} text="Hi world!" data-cy="frame-text" />*/}
						{/*<Element*/}
						{/*    canvas*/}
						{/*    is={Container}*/}
						{/*    padding={6}*/}
						{/*    background="#999999"*/}
						{/*    data-cy="frame-container"*/}
						{/*>*/}
						{/*    <Text*/}
						{/*        size="small"*/}
						{/*        text="It's me again!"*/}
						{/*        data-cy="frame-container-text"*/}
						{/*    />*/}
						{/*</Element>*/}
					</Element>
				</Frame>
				<div style={{display: "flex"}}>
					<div style={{paddingTop: "10px"}}>
						<Toolbox />
					</div>
					<div style={{paddingTop: "10px"}}>
						<SettingsPanel />
					</div>
				</div>
			</Editor>
		</div>
	)
}

export {PageBuilderField as Component}
export default PageBuilderField
// export default fieldHolder(PageBuilderField)
