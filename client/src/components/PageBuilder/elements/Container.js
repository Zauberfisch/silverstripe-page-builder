import React from "react"
import {ElementContainer, ToolbarPortalTop} from "components/PageBuilder/element-utilities"
import styles from "./Container.module.scss"
import classNames from "classnames"
import {ClipboardPasteButton} from "../element-utilities/ClipboardPasteButton"
import {useElementPropSelectDropdown} from "../hooks/useElementPropSelectDropdown"

export const Container = ({background, columns, children, pageBuilderSpecs}) => {
	const backgroundOptions = pageBuilderSpecs.backgroundOptions || []
	const backgroundProp = useElementPropSelectDropdown("background", background, backgroundOptions, {})
	const columnsOptions = React.useMemo(() => {
		if (pageBuilderSpecs.columnsOptions) {
			return pageBuilderSpecs.columnsOptions.map(option => {
				return {pageBuilderClassName: styles[`columns-${option.value}`], iconName: "mdiGrid", ...option}
			})
		}
		return []
	}, [JSON.stringify(pageBuilderSpecs.columnsOptions)])
	const columnsProp = useElementPropSelectDropdown("columns", columns, columnsOptions, {})

	const selectedBackground = backgroundProp.value
	const hasChildren = React.Children.count(children) > 0
	return (
		<ElementContainer padding={false} className={classNames(styles.container, {
			[styles.isEmpty]: !hasChildren,
		})} style={selectedBackground.pageBuilderStyle}>
			<ToolbarPortalTop childrenRight={<ClipboardPasteButton />}>
				{backgroundOptions.length ? backgroundProp.button : null}
				{columnsOptions.length ? columnsProp.button : null}
			</ToolbarPortalTop>
			{hasChildren ? <div className={classNames(styles.children, columnsProp.value.pageBuilderClassName)}>{children}</div> : null}
		</ElementContainer>
	)
}

Container.pageBuilderSpecs = {
	defaultProps: {},
	isCanvas: true,
	iconName: "mdiRectangleOutline",
}
