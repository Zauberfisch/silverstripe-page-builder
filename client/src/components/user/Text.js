import {useNode} from "@craftjs/core"
import React from "react"
import {CreateElementButton} from "../editor/CreateElementButton"
import {ToolbarPortalRow, ToolbarPortalTop} from "../editor/ElementUtilities"
import {ElementContainer} from "../editor/ElementUtilities/ElementContainer"
import {ToolbarButton} from "../editor/Toolbar/ToolbarButton"


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
	// 		{/*{...props}*/}
	return (
		<ElementContainer>
			<ToolbarPortalTop>
				{/*<input type="number" value={fontSize} onChange={(e) => {*/}
				{/*	const val = e.target.value*/}
				{/*	setProp((_props) => {*/}
				{/*		// eslint-disable-next-line no-param-reassign*/}
				{/*		_props.fontSize = val*/}
				{/*	})*/}
				{/*}} />*/}
			</ToolbarPortalTop>
			<ToolbarPortalRow>
				<ToolbarButton title={`foo b`} />
			</ToolbarPortalRow>
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
		</ElementContainer>
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

const defaultProps = {
	text: "Hi",
	fontSize: 20,
}

Text.getTypeDisplayName = () => ss.i18n._t("ZAUBERFISCH_PAGEBUILDER_ELEMENT.Text")

function CreateButton(props) {
	return <CreateElementButton {...props} element={<Text />} iconName="mdiCardTextOutline" />
}

Text.craft = {
	props: defaultProps,
	related: {
		CreateButton,
	},
}
