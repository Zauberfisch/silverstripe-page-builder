import React from "react"
import {Editor, Frame, Element, useEditor} from "@craftjs/core"
import {Toolbar} from "./editor/Toolbar"
import {Button} from "./user/Button"
import {Container} from "./user/Container"
import {RootContainer} from "./user/RootContainer"
import Injector from "lib/Injector"
import styles from "./PageBuilderField.module.scss"
import {PageBuilderContextProvider} from "./PageBuilderContext"

function EditorInner({value, elements, refToolbarTop, refToolbarRows, setPageBuilderEditorQuery}) {
	const {query} = useEditor()
	React.useEffect(() => {
		setPageBuilderEditorQuery(query)
	}, [])
	return (
		<React.Fragment>
			<Toolbar {...{refToolbarTop, refToolbarRows}} />
			<Frame data={value}>
				<Element canvas is={RootContainer}>
					{/*	/!*<Container></Container>*!/*/}
					{/*<Text fontSize={20} text="Initial Text" />*/}
					{/*	/!*<Button />*!/*/}
					{/*	/!*<Text fontSize={20} text="test" />*!/*/}
					{/*	/!*<Button />*!/*/}
					<elements.DraftEditor />
					{/*	/!*<Text fontSize={20} text="test 2" />*!/*/}
				</Element>
			</Frame>
		</React.Fragment>
	)
}

function PageBuilderField({value, setPageBuilderEditorQuery}) {
	const refPageBuilderContainer = React.createRef()
	const refToolbarTop = React.createRef()
	const refToolbarRows = React.createRef()
	const elements = React.useMemo(() => {
		return {
			Button,
			Container,
			DraftEditor: Injector.component.get("PageBuilder/DraftEditor"),
		}
	}, [])
	return (
		<PageBuilderContextProvider {...{
			refPageBuilderContainer,
			elements,
			refToolbarTop,
			refToolbarRows,
		}}>
			<div className={styles.field} ref={refPageBuilderContainer}>
				<Editor resolver={{...elements, RootContainer}}>
					<EditorInner {...{value, elements, refToolbarTop, refToolbarRows, setPageBuilderEditorQuery}} />
				</Editor>
			</div>
		</PageBuilderContextProvider>
	)
}

export {PageBuilderField as Component}
export default PageBuilderField
// export default fieldHolder(PageBuilderField)
