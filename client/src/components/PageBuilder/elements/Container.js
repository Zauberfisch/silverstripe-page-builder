import {Element, useNode} from "@craftjs/core"
import React from "react"
import {CreateElementButton, ElementContainer, ToolbarPortalTop} from "components/PageBuilder/element-utilities"
import {ToolbarSelect} from "components/PageBuilder/form"
import styles from "./Container.module.scss"
import classNames from "classnames"
import {ClipboardPasteButton} from "../element-utilities/ClipboardPasteButton"


export const Container = ({background, children}) => {
	const {actions: {setProp}} = useNode()
	// TODO from CMS
	const backgroundOptions = React.useMemo(() => [
		{
			value: "default",
			title: "Background",
			pageBuilderStyle: {
				backgroundColor: "transparent",
			},
		},
		{
			value: "white",
			title: "White",
			iconName: "mdiSquare",
			iconStyle: {
				color: "#ffffff",
			},
			pageBuilderStyle: {
				backgroundColor: "#ffffff",
			},
		},
		{
			value: "pink",
			title: "Pink",
			iconName: "mdiSquare",
			iconStyle: {
				color: "#e50051",
			},
			// children: <React.Fragment>
			// 	<span style={{display: "inline-block", width: 10, height: 10, margin: '10px 5px 0 0', backgroundColor: "#e50051"}} />
			// 	<span>Pink</span>
			// </React.Fragment>,
			pageBuilderStyle: {
				backgroundColor: "#e50051",
				color: "#ffffff",
			},
		},
		{
			value: "grey",
			title: "Grey",
			iconName: "mdiSquare",
			iconStyle: {
				color: "#ededed",
			},
			pageBuilderStyle: {
				backgroundColor: "#ededed",
			},
		},
	], [])
	const backgroundOnChange = React.useCallback((newBackground) => {
		if (background !== newBackground) {
			setProp((_props) => {
				// eslint-disable-next-line no-param-reassign
				_props.background = newBackground
			})
		}
	}, [background])
	const selectedBackground = backgroundOptions.find(obj => obj.value === background) || {pageBuilderStyle: {}}
	const hasChildren = React.Children.count(children) > 0
	return (
		<ElementContainer padding={false} className={classNames(styles.container, {
			[styles.isEmpty]: !hasChildren,
		})} style={selectedBackground.pageBuilderStyle}>
			<ToolbarPortalTop childrenRight={<ClipboardPasteButton />}>
				<ToolbarSelect value={background} onChange={backgroundOnChange} options={backgroundOptions} />
			</ToolbarPortalTop>
			{hasChildren ? <div className={styles.children}>{children}</div> : null}
		</ElementContainer>
	)
}

const defaultProps = {
	background: "default",
}

Container.getTypeDisplayName = () => ss.i18n._t("ZAUBERFISCH_PAGEBUILDER_ELEMENT.Container")

function CreateButton(props) {
	return <CreateElementButton {...props} title={Container.getTypeDisplayName()} element={<Element canvas is={Container} />} iconName="mdiRectangleOutline" />
}

Container.craft = {
	props: defaultProps,
	related: {
		CreateButton,
	},
	rules: {
		canMoveIn(incomingNodes) {
			const forbiddenChildren = ["Container", "GridContainer"]
			return !forbiddenChildren.includes(incomingNodes.length && incomingNodes[0].data.name)
		},
	},
}
