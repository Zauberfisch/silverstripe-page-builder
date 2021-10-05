import {useNode} from "@craftjs/core"
import React from "react"


export const Text = ({text, fontSize, textAlign, ...props}) => {
	const {
		connectors: {connect},
		// selected,
		// dragged,
		actions: {setProp},
	} = useNode((state) => ({
		selected: state.events.selected,
		dragged: state.events.dragged,
	}))

	const editable = true
	// const [editable, setEditable] = useState(false)
	//
	// useEffect(() => {
	//     if (selected) {
	//         return
	//     }
	//
	//     setEditable(false)
	// }, [selected])

	//onClick={() => selected && setEditable(true)}
	return (
		<div {...props} ref={(ref) => connect(ref)} style={{position: "relative"}}>
			<textarea
				value={text}
				disabled={!editable}
				style={{fontSize: `${fontSize}px`, textAlign}}
				onChange={(e) => {
					const val = e.target.value.replace(/<\/?[^>]+(>|$)/g, "")
					setProp((_props) => {
						// eslint-disable-next-line no-param-reassign
						_props.text = val
					}, 500)
				}}
			/>
			{/*<ContentEditable*/}
			{/*    html={text}*/}
			{/*    disabled={!editable}*/}
			{/*    onChange={(e) =>*/}
			{/*        setProp(*/}
			{/*            (props) =>*/}
			{/*                (props.text = e.target.value.replace(/<\/?[^>]+(>|$)/g, "")),*/}
			{/*            500,*/}
			{/*        )*/}
			{/*    }*/}
			{/*    tagName="p"*/}
			{/*    style={{fontSize: `${fontSize}px`, textAlign}}*/}
			{/*/>*/}
		</div>
	)
}

const TextSettings = () => {
	// const {
	//     actions: {setProp},
	//     fontSize,
	// } = useNode((node) => ({
	//     text: node.data.props.text,
	//     fontSize: node.data.props.fontSize,
	// }))
	//
	// return (
	//     <React.Fragment>
	//         <FormControl size="small" component="fieldset">
	//             <FormLabel component="legend">Font size</FormLabel>
	//             <Slider
	//                 value={fontSize || 7}
	//                 step={7}
	//                 min={1}
	//                 max={50}
	//                 onChange={(_, value) => {
	//                     setProp((props) => (props.fontSize = value), 1000)
	//                 }}
	//             />
	//         </FormControl>
	//     </React.Fragment>
	// )
	return <div />
}

export const TextDefaultProps = {
	text: "Hi",
	fontSize: 20,
}

Text.craft = {
	props: TextDefaultProps,
	related: {
		settings: TextSettings,
	},
}
