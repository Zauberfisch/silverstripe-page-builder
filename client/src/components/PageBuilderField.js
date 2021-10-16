// import fieldHolder from "components/FieldHolder/FieldHolder"
// import Injector from "lib/Injector"
// import fetch from "isomorphic-fetch"
// import url from "url"
// import debounce from "debounce-promise"
// import PropTypes from "prop-types"

import React from "react"
import {Editor, Frame, Element} from "@craftjs/core"

import {Toolbar} from "./editor/Toolbar"
import {Button} from "./user/Button"
import {Container} from "./user/Container"
import {Text} from "./user/Text"
import {RootContainer} from "./user/RootContainer"
// import {RenderNode} from "./editor/RenderNode"
import Injector from "lib/Injector"

import styles from "./PageBuilderField.module.scss"
import {PageBuilderContextProvider} from "./PageBuilderContext"

function PageBuilderField() {
	const refPageBuilderContainer = React.createRef()
	const refToolbarTop = React.createRef()
	const refToolbarRows = React.createRef()

	const elements = {
		Button,
		Text,
		Container,
		DraftEditor: Injector.component.get("PageBuilder/DraftEditor"),
	}


	return (
		<PageBuilderContextProvider {...{
			refPageBuilderContainer,
			elements,
			refToolbarTop,
			refToolbarRows
		}}>
			<div className={styles.field} ref={refPageBuilderContainer}>
				<Editor
					resolver={{...elements, RootContainer}}
					// onRender={RenderNode}
				>
					<Toolbar {...{refToolbarTop, refToolbarRows}} />
					<Frame>
						<Element canvas is={RootContainer}>
							{/*<Container></Container>*/}
							{/*<Text fontSize={20} text="test" />*/}
							{/*<Button />*/}
							{/*<Text fontSize={20} text="test" />*/}
							{/*<Button />*/}
							<elements.DraftEditor />
							{/*<Text fontSize={20} text="test 2" />*/}
						</Element>
					</Frame>
				</Editor>
			</div>
		</PageBuilderContextProvider>
	)
}

export {PageBuilderField as Component}
export default PageBuilderField
// export default fieldHolder(PageBuilderField)
