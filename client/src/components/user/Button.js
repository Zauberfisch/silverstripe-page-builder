import {useEditor, useNode} from "@craftjs/core"
import React from "react"
// import {CursorClickIcon} from "@heroicons/react/solid"
import {CreateElementButton} from "../editor/CreateElementButton"
// import {Text} from "./Text"
// import {ToolbarButton} from "../editor/Toolbar/ToolbarButton"
import {ToolbarPortalTop, ElementContainer} from "../editor/ElementUtilities"

export const Button = ({size, variant, color, text, ...props}) => {
	const {
		connectors: {connect},
	} = useNode()
	return (
		<ElementContainer inline={true}>
			<ToolbarPortalTop>
				<div>A</div>
			</ToolbarPortalTop>
			<button
				style={{margin: "5px"}}
				// size={size}
				// variant={variant}
				color={color}
				{...props}
			>
				{text} (size: {size}, variant: {variant})
			</button>
		</ElementContainer>
	)
}

const ButtonSettings = () => {
	const {
		actions: {setProp},
		props,
	} = useNode((node) => ({
		props: node.data.props,
	}))

	return (
		<div>
			<fieldset>
				<legend>Size</legend>
				<select
					value={props.size}
					onChange={(e) => setProp((_props) => {
						// eslint-disable-next-line no-param-reassign
						_props.size = e.target.value
					})}
				>
					<option value="small">Small</option>
					<option value="medium">Medium</option>
					<option value="large">Large</option>
				</select>
			</fieldset>
			<fieldset>
				<legend>Variant</legend>
				<select
					value={props.variant}
					onChange={(e) => setProp((_props) => {
						// eslint-disable-next-line no-param-reassign
						_props.variant = e.target.value
					})}
				>
					<option value="text">Text</option>
					<option value="outlined">Outlined</option>
					<option value="contained">Contained</option>
				</select>
			</fieldset>
			<fieldset>
				<legend>Color</legend>
				<select
					value={props.color}
					onChange={(e) => setProp((_props) => {
						// eslint-disable-next-line no-param-reassign
						_props.color = e.target.value
					})}
				>
					<option value="default">Default</option>
					<option value="primary">Primary</option>
					<option value="secondary">Secondary</option>
				</select>
			</fieldset>
		</div>
	)
}

const defaultProps = {
	size: "small",
	variant: "contained",
	color: "primary",
	text: "Click me",
}

Button.getTypeDisplayName = () => ss.i18n._t("ZAUBERFISCH_PAGEBUILDER_ELEMENT.Button")

function CreateButton(props) {
	return <CreateElementButton {...props} element={<Button />} iconName="mdiGestureTapButton" />
}

Button.craft = {
	props: defaultProps,
	related: {
		CreateButton,
	},
}
