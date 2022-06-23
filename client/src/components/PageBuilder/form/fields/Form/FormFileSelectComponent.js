import React from "react"
import Injector from "lib/Injector"
import {connect} from "react-redux"

//{buttonTitle,/* rightTitle,*/ buttonComponent = FormButtonComponent, buttonProps = {}, disabled = false,/* children,*/ onChange, value,}
function _FormFileSelectComponent({
	                                  id,
	                                  value: files,
	                                  filesFromRedux,
	                                  onChange,
	                                  maxFiles = 1,
	                                  multi = false,
	                                  parentId = 0,
	                                  disabled = false,
                                  }) {
	const filesJson = JSON.stringify(files)
	const filesFromReduxJson = JSON.stringify(filesFromRedux)
	// const refCurrentValueJson = React.useRef(filesJson)
	// console.log({files, filesFromRedux})
	const UploadField = Injector.component.get("UploadField")
	React.useEffect(() => {
		if (filesFromRedux !== null && filesFromReduxJson !== filesJson) {
			// console.log("useEffect onChange", filesFromRedux)
			onChange(filesFromRedux)
		}
	}, [filesFromReduxJson, onChange])
	const [value, data] = React.useMemo(() => {
		return [
			{Files: files.map(file => file.id)},
			{
				"createFileEndpoint": {
					url: "/",
					method: "post",
					payloadFormat: "urlencoded",
				},
				maxFilesize: 20000000 / 1024 / 1024, // 20mb
				maxFiles,
				multi,
				parentid: parentId,
				canUpload: false,
				canAttach: !disabled,
				files,
			},
		]
	}, [filesJson, maxFiles, multi, parentId, disabled])
	if (!id) {
		return null
	}
	return (
		<React.Fragment>
			<UploadField id={id} name={id} value={value} data={data} disabled={disabled} />
		</React.Fragment>
	)
}

function mapStateToProps(state, ownProps) {
	const id = ownProps.id
	let filesFromRedux = null
	if (state.assetAdmin
		&& state.assetAdmin.uploadField
		&& state.assetAdmin.uploadField.fields
		&& state.assetAdmin.uploadField.fields[id]
	) {
		filesFromRedux = state.assetAdmin.uploadField.fields[id].files || []
	}
	// const securityId = state.config.SecurityID;
	return {filesFromRedux}
}

function mapDispatchToProps(dispatch) {
	return {
		// actions: {
		// 	// uploadField: bindActionCreators(uploadFieldActions, dispatch),
		// 	// modal: bindActionCreators(modalActions, dispatch)
		// },
	}
}

export const FormFileSelectComponent = connect(mapStateToProps, mapDispatchToProps)(_FormFileSelectComponent)
