import {useEditor} from "@craftjs/core"
// import copy from 'copy-to-clipboard';
// import lz from 'lzutf8';
import React, {useState} from "react"
import dialogPolyfill from "dialog-polyfill"

export const Topbar = () => {
	// enabled,
	const {actions, query, canUndo, canRedo} = useEditor(
		(state, _query) => ({
			enabled: state.options.enabled,
			canUndo: state.options.enabled && _query.history.canUndo(),
			canRedo: state.options.enabled && _query.history.canRedo(),
		}),
	)
	const [stateToLoad, setStateToLoad] = useState("")
	const refDialog = React.createRef()
	const handleStateLoad = React.useCallback((e) => {
		if (e.target.returnValue === "submit") {
			// const json = lz.decompress(lz.decodeBase64(stateToLoad));
			const json = stateToLoad
			actions.deserialize(json)
			// eslint-disable-next-line no-alert
			alert("State loaded")
		} else {
			// eslint-disable-next-line no-alert
			alert("canceled")
		}
	}, [])
	React.useEffect(() => {
		refDialog.current.addEventListener("close", handleStateLoad)
		dialogPolyfill.registerDialog(refDialog.current)

		return () => {
			refDialog.current.removeEventListener("close", handleStateLoad)
		}
	}, [])
	return (
		<div style={{padding: 1, margin: "3px 0 1px", background: "#cbe8e7"}}>
			<div style={{display: "flex", alignItems: "center"}}>
				<button style={{marginRight: "10px"}} disabled={!canUndo} onClick={() => actions.history.undo()}>Undo</button>
				<button style={{marginRight: "10px"}} disabled={!canRedo} onClick={() => actions.history.redo()}>Redo</button>
				<button
					style={{marginRight: "10px"}}
					onClick={() => {
						const json = query.serialize()
						/* copy(lz.encodeBase64(lz.compress(json)));*/
						// eslint-disable-next-line no-alert
						alert(json)
						// alert("State copied to clipboard")
					}}
				>
					Copy current state
				</button>
				<button
					onClick={(e) => {
						e.preventDefault()
						refDialog.current.showModal()
					}}
				>
					Load state
				</button>
				<dialog ref={refDialog}>
					<form method="dialog">
						<textarea name="content" value={stateToLoad} onChange={(e) => setStateToLoad(e.target.value)} />
						<button name="cancel" value="cancel">cancel</button>
						<button name="submit" value="submit">submit</button>
					</form>
				</dialog>
			</div>
		</div>
	)
}
