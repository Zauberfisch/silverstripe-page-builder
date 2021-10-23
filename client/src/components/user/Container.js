import {Element, useNode} from "@craftjs/core"
import React from "react"
import {CreateElementButton} from "../editor/CreateElementButton"
import {ElementContainer, ToolbarPortalTop} from "../editor/ElementUtilities"
import {ToolbarSelect} from "../editor/Toolbar/ToolbarSelect"


export const Container = ({background, children, ...props}) => {
	const {actions: {setProp}} = useNode()
	// TODO from CMS
	const backgroundOptions = React.useMemo(() => [
		{
			value: "default",
			title: "Background",
			iconName: "mdiPlusBox",
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
				color: "#fff",
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
	// const backgroundOptions = React.useMemo(() => {
	// 	return Object.fromEntries(Object.entries().map(([value, key]) => [value.label, key]))
	// }, [])
	// console.log({backgrounds, backgroundOptions})

	const backgroundOnChange = React.useCallback((newBackground) => {
		if (background !== newBackground) {
			setProp((_props) => {
				// eslint-disable-next-line no-param-reassign
				_props.background = newBackground
			}, 500)
		}
	}, [background])

	const selectedBackground = backgroundOptions.find(obj => obj.value === background) || {pageBuilderStyle: {}}
	// {...props}
	// style={{margin: "15px 0", background, padding: `${padding}px`, position: "relative"}}
	return (
		<ElementContainer style={{padding: 15, ...selectedBackground.pageBuilderStyle}}>
			<ToolbarPortalTop>
				<ToolbarSelect value={background} onChange={backgroundOnChange} options={backgroundOptions} />
			</ToolbarPortalTop>
			<div style={{minHeight: 15}}>{children}</div>
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
}
