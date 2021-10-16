import {useEditor} from "@craftjs/core"
// import copy from 'copy-to-clipboard';
// import lz from 'lzutf8';
import React, {useState} from "react"
import dialogPolyfill from "dialog-polyfill"

// export const Toolbar = () => {
// 	const {actions, query} = useEditor(
// 		(state, _query) => ({
// 		}),
// 	)
// 	const [stateToLoad, setStateToLoad] = useState("")
// 	const refDialog = React.createRef()
// 	const handleStateLoad = React.useCallback((e) => {
// 		if (e.target.returnValue === "submit") {
// 			// const json = lz.decompress(lz.decodeBase64(stateToLoad));
// 			const json = stateToLoad
// 			actions.deserialize(json)
// 			// eslint-disable-next-line no-alert
// 			alert("State loaded")
// 		} else {
// 			// eslint-disable-next-line no-alert
// 			alert("canceled")
// 		}
// 	}, [])
// 	React.useEffect(() => {
// 		refDialog.current.addEventListener("close", handleStateLoad)
// 		dialogPolyfill.registerDialog(refDialog.current)
//
// 		return () => {
// 			refDialog.current.removeEventListener("close", handleStateLoad)
// 		}
// 	}, [])
// 	return (
// 		<div>
// 			<button
// 				style={{marginRight: "10px"}}
// 				onClick={() => {
// 					const json = query.serialize()
// 					/* copy(lz.encodeBase64(lz.compress(json)));*/
// 					// eslint-disable-next-line no-alert
// 					alert(json)
// 					// alert("State copied to clipboard")
// 				}}
// 			>
// 				Copy current state
// 			</button>
// 			<button
// 				onClick={(e) => {
// 					e.preventDefault()
// 					refDialog.current.showModal()
// 				}}
// 			>
// 				Load state
// 			</button>
// 			<dialog ref={refDialog}>
// 				<form method="dialog">
// 					<textarea name="content" value={stateToLoad} onChange={(e) => setStateToLoad(e.target.value)} />
// 					<button name="cancel" value="cancel">cancel</button>
// 					<button name="submit" value="submit">submit</button>
// 				</form>
// 			</dialog>
// 		</div>
// 	)
// }
