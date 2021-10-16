// import {useNode, useEditor} from "@craftjs/core"
// import {ROOT_NODE} from "@craftjs/utils"
// import React, {useEffect, useRef, useCallback} from "react"
// import ReactDOM from "react-dom"
// import styles from "./RenderNode.module.scss"
// import {PageBuilderContext} from "../PageBuilderContext"
// import {SelectorIcon, ArrowUpIcon, TrashIcon} from "@heroicons/react/solid"
// import classNames from "classnames"
//
// export const RenderNode = ({render}) => {
// 	const {refPageBuilderContainer} = React.useContext(PageBuilderContext)
// 	const {id} = useNode()
// 	const editor = useEditor((state) => ({
// 		isActive: state.nodes[id] && state.nodes[id].events.selected,
// 	}))
// 	const {actions, query, isActive} = editor
//
// 	const isHover = false
// 	const {
// 		// isHover,
// 		dom,
// 		name,
// 		moveable,
// 		deletable,
// 		connectors: {drag, connect},
// 		parent,
// 		node,
// 	} = useNode((node) => ({
// 		isHover: node.events.hovered,
// 		dom: node.dom,
// 		name: node.data.custom.displayName || node.data.displayName,
// 		moveable: query.node(node.id).isDraggable(),
// 		deletable: query.node(node.id).isDeletable(),
// 		parent: node.data.parent,
// 		props: node.data.props,
// 	}))
//
// 	// console.log({
// 	// 	render,
// 	// 	name,
// 	// 	node,
// 	// })
//
// 	const currentRef = useRef()
//
// 	// useEffect(() => {
// 	// 	if (dom) {
// 	// 		if (isActive || isHover) dom.classList.add("todo-component-selected")
// 	// 		else dom.classList.remove("todo-component-selected")
// 	// 	}
// 	// }, [dom, isActive, isHover])
//
// 	const getPos = useCallback((_dom) => {
// 		const {top, left, bottom} = _dom
// 			? _dom.getBoundingClientRect()
// 			: {top: 0, left: 0, bottom: 0}
// 		return {
// 			top: `${top > 0 ? top : bottom}px`,
// 			left: `${left}px`,
// 		}
// 	}, [])
//
// 	const scroll = useCallback(() => {
// 		const {current: currentDOM} = currentRef
//
// 		if (!currentDOM) return
// 		const {top, left} = getPos(dom)
// 		currentDOM.style.top = top
// 		currentDOM.style.left = left
// 	}, [dom, getPos])
//
// 	useEffect(() => {
// 		const el = document.querySelector(".cms .cms-content-fields")
// 		el.addEventListener("scroll", scroll)
//
// 		return () => {
// 			el.removeEventListener("scroll", scroll)
// 		}
// 	}, [scroll])
//
// 	// return render;
//
// 	return (
// 		<React.Fragment>
// 			{isHover || isActive ? ReactDOM.createPortal(
// 				<div
// 					ref={currentRef}
// 					className={styles.indicator}
// 					style={{
// 						left: getPos(dom).left,
// 						top: getPos(dom).top,
// 					}}
// 				>
// 					<h2>{name}</h2>
// 					{moveable ? (
// 						<a ref={drag}><SelectorIcon style={{width: 16}} /></a>
// 					) : null}
// 					{id !== ROOT_NODE && (
// 						<a
// 							role="button"
// 							tabIndex={0}
// 							onClick={() => {
// 								actions.selectNode(parent)
// 							}}
// 						><ArrowUpIcon style={{width: 16}} /></a>
// 					)}
// 				</div>,
// 				refPageBuilderContainer.current,
// 			) : null}
// 			{render}
// 		</React.Fragment>
// 	)
//
// 	// return (
// 	// 	<React.Fragment>
// 	// 		<div style={{padding: 5, position: "relative"}} className={classNames({
// 	// 			"todo-component-selected": isActive || isHover,
// 	// 		})} ref={ref => connect(ref)}>
// 	// 			{isHover || isActive ? <div
// 	// 				className={styles.indicator}
// 	// 				style={{
// 	// 					position: "absolute",
// 	// 					right: 0,
// 	// 					top: 40,
// 	// 					zIndex: 90,
// 	// 				}}
// 	// 			>
// 	// 				<h2>{name}</h2>
// 	// 				{moveable ? (
// 	// 					<a ref={drag}><SelectorIcon style={{width: 16}} /></a>
// 	// 				) : null}
// 	// 			</div> : null}
// 	// 			{render}
// 	// 		</div>
// 	// 	</React.Fragment>
// 	// )
// }
