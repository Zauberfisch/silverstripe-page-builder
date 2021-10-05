import {useEditor} from "@craftjs/core"
import React from "react"

export const SettingsPanel = () => {
	// actions
	const {selected, isEnabled} = useEditor((state, query) => {
		let currentNodeId
		const currentNodes = state.events.selected
		if (currentNodes.size > 1) {
			throw new Error("ERROR: cannot handle selection of multiple nodes")
		} else if (currentNodes.size === 1) {
			// console.log(, 'values')
			currentNodeId = [...currentNodes][0]
		}
		// console.log({
		//     currentNodeId,
		//     size: currentNodeId.size,
		//     length: currentNodeId.length,
		//     "0": currentNodeId[0],
		//     "v0": currentNodeId.values()[0],
		// })
		let _selected

		if (currentNodeId) {
			_selected = {
				id: currentNodeId,
				name: state.nodes[currentNodeId].data.name,
				settings:
					state.nodes[currentNodeId].related &&
					state.nodes[currentNodeId].related.settings,
				isDeletable: query.node(currentNodeId).isDeletable(),
			}
		}

		return {
			selected: _selected,
			isEnabled: state.options.enabled,
		}
	})

	return isEnabled && selected ? (
		<div style={{marginTop: 2, padding: 2, background: "rgba(0, 0, 0, 0.06)"}}>
			<div style={{display: "flex", flexDirection: "column"}}>
				<div style={{background: "yellow", padding: 2, margin: 5}}>
					Selected: {selected.name}
				</div>
				<div style={{background: "yellow", padding: 2, margin: 5}}>
					{selected.settings && React.createElement(selected.settings)}
				</div>
			</div>
		</div>
	) : null
}
