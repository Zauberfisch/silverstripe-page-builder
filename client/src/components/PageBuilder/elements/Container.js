import React from "react"
import {ElementContainer, ToolbarPortalTop} from "components/PageBuilder/element-utilities"
import styles from "./Container.module.scss"
import classNames from "classnames"
import {ClipboardPasteButton} from "../element-utilities/ClipboardPasteButton"
import {useElementPropString, useElementPropSelect} from "../hooks"
import {ToolbarSelectField} from "../form"

export const Container = ({
	                          children,
	                          pageBuilderSpecs,
	                          ...props
                          }) => {
	const columnsOptions = React.useMemo(() => {
		if (pageBuilderSpecs.columnsOptions) {
			return pageBuilderSpecs.columnsOptions.map(option => {
				return {pageBuilderClassName: styles[`columns-${option.value}`], ...option}
			})
		}
		return []
	}, [JSON.stringify(pageBuilderSpecs.columnsOptions)])
	const columnsProp = useElementPropSelect(props, "columns", columnsOptions)
	const backgroundProp = useElementPropSelect(props, "background", pageBuilderSpecs.backgroundOptions)
	const hasChildren = React.Children.count(children) > 0
	return (
		<ElementContainer padding={false} className={classNames(styles.container, {
			[styles.isEmpty]: !hasChildren,
		})} style={backgroundProp.fullValue.pageBuilderStyle || {}}>
			<ToolbarPortalTop childrenRight={<ClipboardPasteButton />}>
				{backgroundProp.options.length ? <ToolbarSelectField options={backgroundProp.options} onChange={backgroundProp.changeHandler} value={backgroundProp.value} /> : null}
				{columnsProp.options.length ? <ToolbarSelectField options={columnsProp.options} onChange={columnsProp.changeHandler} value={columnsProp.value} /> : null}
			</ToolbarPortalTop>
			{hasChildren ? <div className={classNames(styles.children, columnsProp.fullValue.pageBuilderClassName)}>{children}</div> : null}
		</ElementContainer>
	)
}

Container.pageBuilderSpecs = {
	defaultProps: {},
	isCanvas: true,
	iconName: "mdiRectangleOutline",
}
