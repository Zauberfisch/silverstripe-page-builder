import {useNode} from "@craftjs/core"
import React from "react"

export const Container = ({background, padding, children, ...props}) => {
	const {
		connectors: {connect},
	} = useNode()
	return (
		<div {...props} ref={(ref) => connect(ref)} style={{margin: "15px 0", background, padding: `${padding}px`}}>
			{children}
		</div>
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

export const ContainerDefaultProps = {
	background: "#ffffff",
	padding: 15,
}

Container.craft = {
	props: ContainerDefaultProps,
	related: {
		settings: ContainerSettings,
	},
}
