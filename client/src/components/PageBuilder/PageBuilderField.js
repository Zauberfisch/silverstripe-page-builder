import React from "react"
import {Editor, Frame, Element, useEditor} from "@craftjs/core"
import {Toolbar} from "./Toolbar"
import Injector from "lib/Injector"
import styles from "./PageBuilderField.module.scss"
import {PageBuilderContextProvider} from "./PageBuilderContext"
import {UnknownElement, Container, RootContainer} from "./elements"


function EditorInner({value, refToolbarTop, refToolbarRows, setPageBuilderEditorQuery}) {
	const {query} = useEditor()
	React.useEffect(() => {
		setPageBuilderEditorQuery(query)
	}, [])
	return (
		<React.Fragment>
			<Toolbar {...{refToolbarTop, refToolbarRows}} />
			<Frame data={value}>
				<Element canvas is={RootContainer} />
			</Frame>
		</React.Fragment>
	)
}

function PageBuilderField({value, setPageBuilderEditorQuery, elements: allowedElements}) {
	const refPageBuilderContainer = React.createRef()
	const refToolbarTop = React.createRef()
	const refToolbarRows = React.createRef()
	const [allElements, elements] = React.useMemo(() => {
		const valueObject = value ? JSON.parse(value) : null
		const elements = {
			Container,
		}
		Object.entries(allowedElements).forEach(([key, value]) => elements[key] = Injector.component.get(value))
		const allElements = {
			RootContainer,
			...elements,
		}
		if (valueObject) {
			const usedElementTypes = Object.entries(valueObject).map(([id, element]) => {
				return element.type.resolvedName
			})
			usedElementTypes.forEach(elementType => {
				if (typeof allElements[elementType] === "undefined") {
					allElements[elementType] = UnknownElement
				}
			})
		}
		return [allElements, elements]
	}, [JSON.stringify(allowedElements)])

	return (
		<PageBuilderContextProvider {...{
			refPageBuilderContainer,
			elements,
			refToolbarTop,
			refToolbarRows,
		}}>
			<div className={styles.field} ref={refPageBuilderContainer}>
				<Editor resolver={allElements}>
					<EditorInner {...{value, refToolbarTop, refToolbarRows, setPageBuilderEditorQuery}} />
				</Editor>
			</div>
		</PageBuilderContextProvider>
	)
}

export {PageBuilderField as Component}
export default PageBuilderField
// export default fieldHolder(PageBuilderField)