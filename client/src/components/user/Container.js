import {Element, useNode} from "@craftjs/core"
import React from "react"
import {CreateElementButton} from "../editor/CreateElementButton"
import {ElementContainer} from "../editor/ElementUtilities"

const ContainerInner = () => {
}

export const Container = ({background, padding, children, ...props}) => {
	const {
		connectors: {connect},
	} = useNode()
	// {...props}
	// style={{margin: "15px 0", background, padding: `${padding}px`, position: "relative"}}
	return (
		<ElementContainer style={{background: background}}>
			<div style={{padding: 15}}>{children}</div>
		</ElementContainer>
	)
}

export const ContainerSettings = () => {
	return <div>Settings TODO</div>
	// const {
	//   background,
	//   padding,
	//   actions: { setProp },
	// } = useNode((node) => ({
	//   background: node.data.props.background,
	//   padding: node.data.props.padding,
	// }));
	//
	// return (
	//   <div>
	//     <FormControl fullWidth={true} margin="normal" component="fieldset">
	//       <FormLabel component="legend">Background</FormLabel>
	//       <ColorPicker
	//         name="background-color"
	//         value={background}
	//         onChange={(color) => {
	//           setProp((props) => (props.background = color), 500);
	//         }}
	//       />
	//     </FormControl>
	//     <FormControl fullWidth={true} margin="normal" component="fieldset">
	//       <FormLabel component="legend">Padding</FormLabel>
	//       <Slider
	//         defaultValue={padding}
	//         onChange={(_, value) =>
	//           setProp((props) => (props.padding = value), 500)
	//         }
	//       />
	//     </FormControl>
	//   </div>
	// );
}


const defaultProps = {
	background: "#ffffff",
	padding: 35,
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
}
