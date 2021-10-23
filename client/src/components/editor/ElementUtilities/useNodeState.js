import {useEditor, useNode} from "@craftjs/core"

export function useNodeState() {
	const {isActive, query} = useEditor((state) => ({
		isActive: state.nodes[id] && state.nodes[id].events.selected,
	}))
	const {id, displayName, isHover, isMoveable, isDeletable, parentId} = useNode(node => ({
		id: node.id,
		displayName: node.data.type.getTypeDisplayName(),
		isHover: node.events.hovered,
		isMoveable: query.node(node.id).isDraggable(),
		isDeletable: query.node(node.id).isDeletable(),
		parentId: node.data.parent,
	}))
	return {id, displayName, isHover, isActive, isMoveable, isDeletable, parentId}
}
