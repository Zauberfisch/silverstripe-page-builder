/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./client/src/bundles/bundle.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./client/src/boot/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Injector = __webpack_require__(2);

var _Injector2 = _interopRequireDefault(_Injector);

var _PageBuilderField = __webpack_require__("./client/src/components/PageBuilderField.js");

var _PageBuilderField2 = _interopRequireDefault(_PageBuilderField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.document.addEventListener("DOMContentLoaded", function () {
	_Injector2.default.component.registerMany({
		PageBuilderField: _PageBuilderField2.default
	});
});

/***/ }),

/***/ "./client/src/bundles/bundle.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__("./client/src/legacy/entwine.js");

__webpack_require__("./client/src/boot/index.js");

/***/ }),

/***/ "./client/src/components/PageBuilderField.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Component = undefined;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _core = __webpack_require__(1);

var _SettingsPanel = __webpack_require__("./client/src/components/editor/SettingsPanel.js");

var _Toolbox = __webpack_require__("./client/src/components/editor/Toolbox.js");

var _Topbar = __webpack_require__("./client/src/components/editor/Topbar.js");

var _Button = __webpack_require__("./client/src/components/user/Button.js");

var _Container = __webpack_require__("./client/src/components/user/Container.js");

var _Text = __webpack_require__("./client/src/components/user/Text.js");

var _RenderNode = __webpack_require__("./client/src/components/editor/RenderNode.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function PageBuilderField() {
	return _react2.default.createElement(
		"div",
		{ className: "page-container" },
		_react2.default.createElement(
			_core.Editor,
			{
				resolver: {
					Button: _Button.Button,
					Text: _Text.Text,
					Container: _Container.Container
				},
				onRender: _RenderNode.RenderNode
			},
			_react2.default.createElement(_Topbar.Topbar, null),
			_react2.default.createElement(
				_core.Frame,
				null,
				_react2.default.createElement(
					_core.Element,
					{
						canvas: true,
						is: _Container.Container,
						padding: 5,
						background: "#eeeeee"
					},
					_react2.default.createElement(_Text.Text, { fontSize: 20, text: "test", "data-cy": "frame-text" })
				)
			),
			_react2.default.createElement(
				"div",
				{ style: { display: "flex" } },
				_react2.default.createElement(
					"div",
					{ style: { paddingTop: "10px" } },
					_react2.default.createElement(_Toolbox.Toolbox, null)
				),
				_react2.default.createElement(
					"div",
					{ style: { paddingTop: "10px" } },
					_react2.default.createElement(_SettingsPanel.SettingsPanel, null)
				)
			)
		)
	);
}

exports.Component = PageBuilderField;
exports.default = PageBuilderField;

/***/ }),

/***/ "./client/src/components/editor/RenderNode.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.RenderNode = undefined;

var _core = __webpack_require__(1);

var _utils = __webpack_require__(4);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RenderNode = exports.RenderNode = function RenderNode(_ref) {
	var render = _ref.render;

	var _useNode = (0, _core.useNode)(),
	    id = _useNode.id;

	var _useEditor = (0, _core.useEditor)(function (state) {
		return {
			isActive: state.nodes[id] && state.nodes[id].events.selected
		};
	}),
	    actions = _useEditor.actions,
	    query = _useEditor.query,
	    isActive = _useEditor.isActive;

	var isHover = false;

	var _useNode2 = (0, _core.useNode)(function (node) {
		return {
			isHover: node.events.hovered,
			dom: node.dom,
			name: node.data.custom.displayName || node.data.displayName,
			moveable: query.node(node.id).isDraggable(),
			deletable: query.node(node.id).isDeletable(),
			parent: node.data.parent,
			props: node.data.props
		};
	}),
	    dom = _useNode2.dom,
	    name = _useNode2.name,
	    moveable = _useNode2.moveable,
	    deletable = _useNode2.deletable,
	    drag = _useNode2.connectors.drag,
	    parent = _useNode2.parent;

	var currentRef = (0, _react.useRef)();

	(0, _react.useEffect)(function () {
		if (dom) {
			if (isActive || isHover) dom.classList.add("todo-component-selected");else dom.classList.remove("todo-component-selected");
		}
	}, [dom, isActive, isHover]);

	var getPos = (0, _react.useCallback)(function (_dom) {
		var _ref2 = _dom ? _dom.getBoundingClientRect() : { top: 0, left: 0, bottom: 0 },
		    top = _ref2.top,
		    left = _ref2.left,
		    bottom = _ref2.bottom;

		return {
			top: (top > 0 ? top : bottom) + "px",
			left: left + "px"
		};
	}, []);

	var scroll = (0, _react.useCallback)(function () {
		var currentDOM = currentRef.current;


		if (!currentDOM) return;

		var _getPos = getPos(dom),
		    top = _getPos.top,
		    left = _getPos.left;

		currentDOM.style.top = top;
		currentDOM.style.left = left;
	}, [dom, getPos]);

	(0, _react.useEffect)(function () {
		var el = document.querySelector(".cms .cms-content-fields");
		el.addEventListener("scroll", scroll);

		return function () {
			el.removeEventListener("scroll", scroll);
		};
	}, [scroll]);

	return _react2.default.createElement(
		_react2.default.Fragment,
		null,
		isHover || isActive ? _reactDom2.default.createPortal(_react2.default.createElement(
			"div",
			{
				ref: currentRef,
				className: "todo-IndicatorDiv",
				style: {
					left: getPos(dom).left,
					top: getPos(dom).top,
					zIndex: 9999
				}
			},
			_react2.default.createElement(
				"h2",
				null,
				name
			),
			moveable ? _react2.default.createElement(
				"a",
				{ ref: drag },
				"Move"
			) : null,
			id !== _utils.ROOT_NODE && _react2.default.createElement(
				"a",
				{
					role: "button",
					tabIndex: 0,
					onClick: function onClick() {
						actions.selectNode(parent);
					}
				},
				"Go Up"
			),
			deletable ? _react2.default.createElement(
				"a",
				{
					role: "button",
					tabIndex: 0,
					onMouseDown: function onMouseDown(e) {
						e.stopPropagation();
						actions.delete(id);
					}
				},
				"Delete"
			) : null
		), document.querySelector(".page-container")) : null,
		render
	);
};

/***/ }),

/***/ "./client/src/components/editor/SettingsPanel.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.SettingsPanel = undefined;

var _core = __webpack_require__(1);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var SettingsPanel = exports.SettingsPanel = function SettingsPanel() {
	var _useEditor = (0, _core.useEditor)(function (state, query) {
		var currentNodeId = void 0;
		var currentNodes = state.events.selected;
		if (currentNodes.size > 1) {
			throw new Error("ERROR: cannot handle selection of multiple nodes");
		} else if (currentNodes.size === 1) {
			currentNodeId = [].concat(_toConsumableArray(currentNodes))[0];
		}

		var _selected = void 0;

		if (currentNodeId) {
			_selected = {
				id: currentNodeId,
				name: state.nodes[currentNodeId].data.name,
				settings: state.nodes[currentNodeId].related && state.nodes[currentNodeId].related.settings,
				isDeletable: query.node(currentNodeId).isDeletable()
			};
		}

		return {
			selected: _selected,
			isEnabled: state.options.enabled
		};
	}),
	    selected = _useEditor.selected,
	    isEnabled = _useEditor.isEnabled;

	return isEnabled && selected ? _react2.default.createElement(
		"div",
		{ style: { marginTop: 2, padding: 2, background: "rgba(0, 0, 0, 0.06)" } },
		_react2.default.createElement(
			"div",
			{ style: { display: "flex", flexDirection: "column" } },
			_react2.default.createElement(
				"div",
				{ style: { background: "yellow", padding: 2, margin: 5 } },
				"Selected: ",
				selected.name
			),
			_react2.default.createElement(
				"div",
				{ style: { background: "yellow", padding: 2, margin: 5 } },
				selected.settings && _react2.default.createElement(selected.settings)
			)
		)
	) : null;
};

/***/ }),

/***/ "./client/src/components/editor/Toolbox.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Toolbox = undefined;

var _core = __webpack_require__(1);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Button = __webpack_require__("./client/src/components/user/Button.js");

var _Container = __webpack_require__("./client/src/components/user/Container.js");

var _Text = __webpack_require__("./client/src/components/user/Text.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Toolbox = exports.Toolbox = function Toolbox() {
	var _useEditor = (0, _core.useEditor)(),
	    connectors = _useEditor.connectors;

	return _react2.default.createElement(
		"div",
		{ style: { padding: 2, background: "green" } },
		_react2.default.createElement(
			"div",
			{ style: { display: "flex", flexDirection: "column", alignItems: "center", justifyItems: "center" } },
			_react2.default.createElement(
				"div",
				null,
				_react2.default.createElement(
					"button",
					{
						ref: function ref(_ref) {
							return connectors.create(_ref, _react2.default.createElement(_Button.Button, { text: "Click me", size: "small" }));
						}
					},
					"Button"
				)
			),
			_react2.default.createElement(
				"div",
				null,
				_react2.default.createElement(
					"button",
					{
						ref: function ref(_ref2) {
							return connectors.create(_ref2, _react2.default.createElement(_Text.Text, { text: "Hi world" }));
						}
					},
					"Text"
				)
			),
			_react2.default.createElement(
				"div",
				null,
				_react2.default.createElement(
					"button",
					{
						ref: function ref(_ref3) {
							return connectors.create(_ref3, _react2.default.createElement(_core.Element, { canvas: true, is: _Container.Container, padding: 20 }));
						}
					},
					"Container"
				)
			)
		)
	);
};

/***/ }),

/***/ "./client/src/components/editor/Topbar.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Topbar = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _core = __webpack_require__(1);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _dialogPolyfill = __webpack_require__("./node_modules/dialog-polyfill/dist/dialog-polyfill.esm.js");

var _dialogPolyfill2 = _interopRequireDefault(_dialogPolyfill);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Topbar = exports.Topbar = function Topbar() {
	var _useEditor = (0, _core.useEditor)(function (state, _query) {
		return {
			enabled: state.options.enabled,
			canUndo: state.options.enabled && _query.history.canUndo(),
			canRedo: state.options.enabled && _query.history.canRedo()
		};
	}),
	    actions = _useEditor.actions,
	    query = _useEditor.query,
	    canUndo = _useEditor.canUndo,
	    canRedo = _useEditor.canRedo;

	var _useState = (0, _react.useState)(""),
	    _useState2 = _slicedToArray(_useState, 2),
	    stateToLoad = _useState2[0],
	    setStateToLoad = _useState2[1];

	var refDialog = _react2.default.createRef();
	var handleStateLoad = _react2.default.useCallback(function (e) {
		if (e.target.returnValue === "submit") {
			var json = stateToLoad;
			actions.deserialize(json);

			alert("State loaded");
		} else {
			alert("canceled");
		}
	}, []);
	_react2.default.useEffect(function () {
		refDialog.current.addEventListener("close", handleStateLoad);
		_dialogPolyfill2.default.registerDialog(refDialog.current);

		return function () {
			refDialog.current.removeEventListener("close", handleStateLoad);
		};
	}, []);
	return _react2.default.createElement(
		"div",
		{ style: { padding: 1, margin: "3px 0 1px", background: "#cbe8e7" } },
		_react2.default.createElement(
			"div",
			{ style: { display: "flex", alignItems: "center" } },
			_react2.default.createElement(
				"button",
				{ style: { marginRight: "10px" }, disabled: !canUndo, onClick: function onClick() {
						return actions.history.undo();
					} },
				"Undo"
			),
			_react2.default.createElement(
				"button",
				{ style: { marginRight: "10px" }, disabled: !canRedo, onClick: function onClick() {
						return actions.history.redo();
					} },
				"Redo"
			),
			_react2.default.createElement(
				"button",
				{
					style: { marginRight: "10px" },
					onClick: function onClick() {
						var json = query.serialize();

						alert(json);
					}
				},
				"Copy current state"
			),
			_react2.default.createElement(
				"button",
				{
					onClick: function onClick(e) {
						e.preventDefault();
						refDialog.current.showModal();
					}
				},
				"Load state"
			),
			_react2.default.createElement(
				"dialog",
				{ ref: refDialog },
				_react2.default.createElement(
					"form",
					{ method: "dialog" },
					_react2.default.createElement("textarea", { name: "content", value: stateToLoad, onChange: function onChange(e) {
							return setStateToLoad(e.target.value);
						} }),
					_react2.default.createElement(
						"button",
						{ name: "cancel", value: "cancel" },
						"cancel"
					),
					_react2.default.createElement(
						"button",
						{ name: "submit", value: "submit" },
						"submit"
					)
				)
			)
		)
	);
};

/***/ }),

/***/ "./client/src/components/user/Button.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ButtonDefaultProps = exports.ButtonSettings = exports.Button = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _core = __webpack_require__(1);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Button = function Button(_ref) {
	var size = _ref.size,
	    variant = _ref.variant,
	    color = _ref.color,
	    text = _ref.text,
	    props = _objectWithoutProperties(_ref, ["size", "variant", "color", "text"]);

	var _useNode = (0, _core.useNode)(),
	    connect = _useNode.connectors.connect;

	return _react2.default.createElement(
		"button",
		_extends({
			ref: function ref(_ref2) {
				return connect(_ref2);
			},
			style: { margin: "5px" },

			color: color
		}, props),
		text,
		" (size: ",
		size,
		", variant: ",
		variant,
		")"
	);
};

exports.Button = Button;
var ButtonSettings = exports.ButtonSettings = function ButtonSettings() {
	var _useNode2 = (0, _core.useNode)(function (node) {
		return {
			props: node.data.props
		};
	}),
	    setProp = _useNode2.actions.setProp,
	    props = _useNode2.props;

	return _react2.default.createElement(
		"div",
		null,
		_react2.default.createElement(
			"fieldset",
			null,
			_react2.default.createElement(
				"legend",
				null,
				"Size"
			),
			_react2.default.createElement(
				"select",
				{
					value: props.size,
					onChange: function onChange(e) {
						return setProp(function (_props) {
							_props.size = e.target.value;
						});
					}
				},
				_react2.default.createElement(
					"option",
					{ value: "small" },
					"Small"
				),
				_react2.default.createElement(
					"option",
					{ value: "medium" },
					"Medium"
				),
				_react2.default.createElement(
					"option",
					{ value: "large" },
					"Large"
				)
			)
		),
		_react2.default.createElement(
			"fieldset",
			null,
			_react2.default.createElement(
				"legend",
				null,
				"Variant"
			),
			_react2.default.createElement(
				"select",
				{
					value: props.variant,
					onChange: function onChange(e) {
						return setProp(function (_props) {
							_props.variant = e.target.value;
						});
					}
				},
				_react2.default.createElement(
					"option",
					{ value: "text" },
					"Text"
				),
				_react2.default.createElement(
					"option",
					{ value: "outlined" },
					"Outlined"
				),
				_react2.default.createElement(
					"option",
					{ value: "contained" },
					"Contained"
				)
			)
		),
		_react2.default.createElement(
			"fieldset",
			null,
			_react2.default.createElement(
				"legend",
				null,
				"Color"
			),
			_react2.default.createElement(
				"select",
				{
					value: props.color,
					onChange: function onChange(e) {
						return setProp(function (_props) {
							_props.color = e.target.value;
						});
					}
				},
				_react2.default.createElement(
					"option",
					{ value: "default" },
					"Default"
				),
				_react2.default.createElement(
					"option",
					{ value: "primary" },
					"Primary"
				),
				_react2.default.createElement(
					"option",
					{ value: "secondary" },
					"Secondary"
				)
			)
		)
	);
};

var ButtonDefaultProps = exports.ButtonDefaultProps = {
	size: "small",
	variant: "contained",
	color: "primary",
	text: "Click me"
};

Button.craft = {
	props: ButtonDefaultProps,
	related: {
		settings: ButtonSettings
	}
};

/***/ }),

/***/ "./client/src/components/user/Container.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ContainerDefaultProps = exports.ContainerSettings = exports.Container = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _core = __webpack_require__(1);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Container = function Container(_ref) {
	var background = _ref.background,
	    padding = _ref.padding,
	    children = _ref.children,
	    props = _objectWithoutProperties(_ref, ["background", "padding", "children"]);

	var _useNode = (0, _core.useNode)(),
	    connect = _useNode.connectors.connect;

	return _react2.default.createElement(
		"div",
		_extends({}, props, { ref: function ref(_ref2) {
				return connect(_ref2);
			}, style: { margin: "15px 0", background: background, padding: padding + "px" } }),
		children
	);
};

exports.Container = Container;
var ContainerSettings = exports.ContainerSettings = function ContainerSettings() {
	return _react2.default.createElement(
		"div",
		null,
		"Settings TODO"
	);
};

var ContainerDefaultProps = exports.ContainerDefaultProps = {
	background: "#ffffff",
	padding: 15
};

Container.craft = {
	props: ContainerDefaultProps,
	related: {
		settings: ContainerSettings
	}
};

/***/ }),

/***/ "./client/src/components/user/Text.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.TextDefaultProps = exports.Text = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _core = __webpack_require__(1);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Text = function Text(_ref) {
	var text = _ref.text,
	    fontSize = _ref.fontSize,
	    textAlign = _ref.textAlign,
	    props = _objectWithoutProperties(_ref, ["text", "fontSize", "textAlign"]);

	var _useNode = (0, _core.useNode)(function (state) {
		return {
			selected: state.events.selected,
			dragged: state.events.dragged
		};
	}),
	    connect = _useNode.connectors.connect,
	    setProp = _useNode.actions.setProp;

	var editable = true;

	return _react2.default.createElement(
		"div",
		_extends({}, props, { ref: function ref(_ref2) {
				return connect(_ref2);
			}, style: { position: "relative" } }),
		_react2.default.createElement("textarea", {
			value: text,
			disabled: !editable,
			style: { fontSize: fontSize + "px", textAlign: textAlign },
			onChange: function onChange(e) {
				var val = e.target.value.replace(/<\/?[^>]+(>|$)/g, "");
				setProp(function (_props) {
					_props.text = val;
				}, 500);
			}
		})
	);
};

exports.Text = Text;
var TextSettings = function TextSettings() {
	return _react2.default.createElement("div", null);
};

var TextDefaultProps = exports.TextDefaultProps = {
	text: "Hi",
	fontSize: 20
};

Text.craft = {
	props: TextDefaultProps,
	related: {
		settings: TextSettings
	}
};

/***/ }),

/***/ "./client/src/legacy/entwine.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _jquery = __webpack_require__(5);

var _jquery2 = _interopRequireDefault(_jquery);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(3);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Injector = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_jquery2.default.entwine("ss", function ($) {
	$(".js-injector-boot .form__field-holder .zauberfisch__page-builder__field").entwine({
		onmatch: function onmatch() {
			var PageBuilderField = (0, _Injector.loadComponent)("PageBuilderField");


			var props = {};

			_reactDom2.default.render(_react2.default.createElement(PageBuilderField, props), this[0]);
		},
		onunmatch: function onunmatch() {
			_reactDom2.default.unmountComponentAtNode(this[0]);
		}
	});
});

/***/ }),

/***/ "./node_modules/dialog-polyfill/dist/dialog-polyfill.esm.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
// nb. This is for IE10 and lower _only_.
var supportCustomEvent = window.CustomEvent;
if (!supportCustomEvent || typeof supportCustomEvent === 'object') {
  supportCustomEvent = function CustomEvent(event, x) {
    x = x || {};
    var ev = document.createEvent('CustomEvent');
    ev.initCustomEvent(event, !!x.bubbles, !!x.cancelable, x.detail || null);
    return ev;
  };
  supportCustomEvent.prototype = window.Event.prototype;
}

/**
 * Dispatches the passed event to both an "on<type>" handler as well as via the
 * normal dispatch operation. Does not bubble.
 *
 * @param {!EventTarget} target
 * @param {!Event} event
 * @return {boolean}
 */
function safeDispatchEvent(target, event) {
  var check = 'on' + event.type.toLowerCase();
  if (typeof target[check] === 'function') {
    target[check](event);
  }
  return target.dispatchEvent(event);
}

/**
 * @param {Element} el to check for stacking context
 * @return {boolean} whether this el or its parents creates a stacking context
 */
function createsStackingContext(el) {
  while (el && el !== document.body) {
    var s = window.getComputedStyle(el);
    var invalid = function(k, ok) {
      return !(s[k] === undefined || s[k] === ok);
    };

    if (s.opacity < 1 ||
        invalid('zIndex', 'auto') ||
        invalid('transform', 'none') ||
        invalid('mixBlendMode', 'normal') ||
        invalid('filter', 'none') ||
        invalid('perspective', 'none') ||
        s['isolation'] === 'isolate' ||
        s.position === 'fixed' ||
        s.webkitOverflowScrolling === 'touch') {
      return true;
    }
    el = el.parentElement;
  }
  return false;
}

/**
 * Finds the nearest <dialog> from the passed element.
 *
 * @param {Element} el to search from
 * @return {HTMLDialogElement} dialog found
 */
function findNearestDialog(el) {
  while (el) {
    if (el.localName === 'dialog') {
      return /** @type {HTMLDialogElement} */ (el);
    }
    if (el.parentElement) {
      el = el.parentElement;
    } else if (el.parentNode) {
      el = el.parentNode.host;
    } else {
      el = null;
    }
  }
  return null;
}

/**
 * Blur the specified element, as long as it's not the HTML body element.
 * This works around an IE9/10 bug - blurring the body causes Windows to
 * blur the whole application.
 *
 * @param {Element} el to blur
 */
function safeBlur(el) {
  // Find the actual focused element when the active element is inside a shadow root
  while (el && el.shadowRoot && el.shadowRoot.activeElement) {
    el = el.shadowRoot.activeElement;
  }

  if (el && el.blur && el !== document.body) {
    el.blur();
  }
}

/**
 * @param {!NodeList} nodeList to search
 * @param {Node} node to find
 * @return {boolean} whether node is inside nodeList
 */
function inNodeList(nodeList, node) {
  for (var i = 0; i < nodeList.length; ++i) {
    if (nodeList[i] === node) {
      return true;
    }
  }
  return false;
}

/**
 * @param {HTMLFormElement} el to check
 * @return {boolean} whether this form has method="dialog"
 */
function isFormMethodDialog(el) {
  if (!el || !el.hasAttribute('method')) {
    return false;
  }
  return el.getAttribute('method').toLowerCase() === 'dialog';
}

/**
 * @param {!DocumentFragment|!Element} hostElement
 * @return {?Element}
 */
function findFocusableElementWithin(hostElement) {
  // Note that this is 'any focusable area'. This list is probably not exhaustive, but the
  // alternative involves stepping through and trying to focus everything.
  var opts = ['button', 'input', 'keygen', 'select', 'textarea'];
  var query = opts.map(function(el) {
    return el + ':not([disabled])';
  });
  // TODO(samthor): tabindex values that are not numeric are not focusable.
  query.push('[tabindex]:not([disabled]):not([tabindex=""])');  // tabindex != "", not disabled
  var target = hostElement.querySelector(query.join(', '));

  if (!target && 'attachShadow' in Element.prototype) {
    // If we haven't found a focusable target, see if the host element contains an element
    // which has a shadowRoot.
    // Recursively search for the first focusable item in shadow roots.
    var elems = hostElement.querySelectorAll('*');
    for (var i = 0; i < elems.length; i++) {
      if (elems[i].tagName && elems[i].shadowRoot) {
        target = findFocusableElementWithin(elems[i].shadowRoot);
        if (target) {
          break;
        }
      }
    }
  }
  return target;
}

/**
 * Determines if an element is attached to the DOM.
 * @param {Element} element to check
 * @return {boolean} whether the element is in DOM
 */
function isConnected(element) {
  return element.isConnected || document.body.contains(element);
}

/**
 * @param {!Event} event
 * @return {?Element}
 */
function findFormSubmitter(event) {
  if (event.submitter) {
    return event.submitter;
  }

  var form = event.target;
  if (!(form instanceof HTMLFormElement)) {
    return null;
  }

  var submitter = dialogPolyfill.formSubmitter;
  if (!submitter) {
    var target = event.target;
    var root = ('getRootNode' in target && target.getRootNode() || document);
    submitter = root.activeElement;
  }

  if (!submitter || submitter.form !== form) {
    return null;
  }
  return submitter;
}

/**
 * @param {!Event} event
 */
function maybeHandleSubmit(event) {
  if (event.defaultPrevented) {
    return;
  }
  var form = /** @type {!HTMLFormElement} */ (event.target);

  // We'd have a value if we clicked on an imagemap.
  var value = dialogPolyfill.imagemapUseValue;
  var submitter = findFormSubmitter(event);
  if (value === null && submitter) {
    value = submitter.value;
  }

  // There should always be a dialog as this handler is added specifically on them, but check just
  // in case.
  var dialog = findNearestDialog(form);
  if (!dialog) {
    return;
  }

  // Prefer formmethod on the button.
  var formmethod = submitter && submitter.getAttribute('formmethod') || form.getAttribute('method');
  if (formmethod !== 'dialog') {
    return;
  }
  event.preventDefault();

  if (value != null) {
    // nb. we explicitly check against null/undefined
    dialog.close(value);
  } else {
    dialog.close();
  }
}

/**
 * @param {!HTMLDialogElement} dialog to upgrade
 * @constructor
 */
function dialogPolyfillInfo(dialog) {
  this.dialog_ = dialog;
  this.replacedStyleTop_ = false;
  this.openAsModal_ = false;

  // Set a11y role. Browsers that support dialog implicitly know this already.
  if (!dialog.hasAttribute('role')) {
    dialog.setAttribute('role', 'dialog');
  }

  dialog.show = this.show.bind(this);
  dialog.showModal = this.showModal.bind(this);
  dialog.close = this.close.bind(this);

  dialog.addEventListener('submit', maybeHandleSubmit, false);

  if (!('returnValue' in dialog)) {
    dialog.returnValue = '';
  }

  if ('MutationObserver' in window) {
    var mo = new MutationObserver(this.maybeHideModal.bind(this));
    mo.observe(dialog, {attributes: true, attributeFilter: ['open']});
  } else {
    // IE10 and below support. Note that DOMNodeRemoved etc fire _before_ removal. They also
    // seem to fire even if the element was removed as part of a parent removal. Use the removed
    // events to force downgrade (useful if removed/immediately added).
    var removed = false;
    var cb = function() {
      removed ? this.downgradeModal() : this.maybeHideModal();
      removed = false;
    }.bind(this);
    var timeout;
    var delayModel = function(ev) {
      if (ev.target !== dialog) { return; }  // not for a child element
      var cand = 'DOMNodeRemoved';
      removed |= (ev.type.substr(0, cand.length) === cand);
      window.clearTimeout(timeout);
      timeout = window.setTimeout(cb, 0);
    };
    ['DOMAttrModified', 'DOMNodeRemoved', 'DOMNodeRemovedFromDocument'].forEach(function(name) {
      dialog.addEventListener(name, delayModel);
    });
  }
  // Note that the DOM is observed inside DialogManager while any dialog
  // is being displayed as a modal, to catch modal removal from the DOM.

  Object.defineProperty(dialog, 'open', {
    set: this.setOpen.bind(this),
    get: dialog.hasAttribute.bind(dialog, 'open')
  });

  this.backdrop_ = document.createElement('div');
  this.backdrop_.className = 'backdrop';
  this.backdrop_.addEventListener('mouseup'  , this.backdropMouseEvent_.bind(this));
  this.backdrop_.addEventListener('mousedown', this.backdropMouseEvent_.bind(this));
  this.backdrop_.addEventListener('click'    , this.backdropMouseEvent_.bind(this));
}

dialogPolyfillInfo.prototype = /** @type {HTMLDialogElement.prototype} */ ({

  get dialog() {
    return this.dialog_;
  },

  /**
   * Maybe remove this dialog from the modal top layer. This is called when
   * a modal dialog may no longer be tenable, e.g., when the dialog is no
   * longer open or is no longer part of the DOM.
   */
  maybeHideModal: function() {
    if (this.dialog_.hasAttribute('open') && isConnected(this.dialog_)) { return; }
    this.downgradeModal();
  },

  /**
   * Remove this dialog from the modal top layer, leaving it as a non-modal.
   */
  downgradeModal: function() {
    if (!this.openAsModal_) { return; }
    this.openAsModal_ = false;
    this.dialog_.style.zIndex = '';

    // This won't match the native <dialog> exactly because if the user set top on a centered
    // polyfill dialog, that top gets thrown away when the dialog is closed. Not sure it's
    // possible to polyfill this perfectly.
    if (this.replacedStyleTop_) {
      this.dialog_.style.top = '';
      this.replacedStyleTop_ = false;
    }

    // Clear the backdrop and remove from the manager.
    this.backdrop_.parentNode && this.backdrop_.parentNode.removeChild(this.backdrop_);
    dialogPolyfill.dm.removeDialog(this);
  },

  /**
   * @param {boolean} value whether to open or close this dialog
   */
  setOpen: function(value) {
    if (value) {
      this.dialog_.hasAttribute('open') || this.dialog_.setAttribute('open', '');
    } else {
      this.dialog_.removeAttribute('open');
      this.maybeHideModal();  // nb. redundant with MutationObserver
    }
  },

  /**
   * Handles mouse events ('mouseup', 'mousedown', 'click') on the fake .backdrop element, redirecting them as if
   * they were on the dialog itself.
   *
   * @param {!Event} e to redirect
   */
  backdropMouseEvent_: function(e) {
    if (!this.dialog_.hasAttribute('tabindex')) {
      // Clicking on the backdrop should move the implicit cursor, even if dialog cannot be
      // focused. Create a fake thing to focus on. If the backdrop was _before_ the dialog, this
      // would not be needed - clicks would move the implicit cursor there.
      var fake = document.createElement('div');
      this.dialog_.insertBefore(fake, this.dialog_.firstChild);
      fake.tabIndex = -1;
      fake.focus();
      this.dialog_.removeChild(fake);
    } else {
      this.dialog_.focus();
    }

    var redirectedEvent = document.createEvent('MouseEvents');
    redirectedEvent.initMouseEvent(e.type, e.bubbles, e.cancelable, window,
        e.detail, e.screenX, e.screenY, e.clientX, e.clientY, e.ctrlKey,
        e.altKey, e.shiftKey, e.metaKey, e.button, e.relatedTarget);
    this.dialog_.dispatchEvent(redirectedEvent);
    e.stopPropagation();
  },

  /**
   * Focuses on the first focusable element within the dialog. This will always blur the current
   * focus, even if nothing within the dialog is found.
   */
  focus_: function() {
    // Find element with `autofocus` attribute, or fall back to the first form/tabindex control.
    var target = this.dialog_.querySelector('[autofocus]:not([disabled])');
    if (!target && this.dialog_.tabIndex >= 0) {
      target = this.dialog_;
    }
    if (!target) {
      target = findFocusableElementWithin(this.dialog_);
    }
    safeBlur(document.activeElement);
    target && target.focus();
  },

  /**
   * Sets the zIndex for the backdrop and dialog.
   *
   * @param {number} dialogZ
   * @param {number} backdropZ
   */
  updateZIndex: function(dialogZ, backdropZ) {
    if (dialogZ < backdropZ) {
      throw new Error('dialogZ should never be < backdropZ');
    }
    this.dialog_.style.zIndex = dialogZ;
    this.backdrop_.style.zIndex = backdropZ;
  },

  /**
   * Shows the dialog. If the dialog is already open, this does nothing.
   */
  show: function() {
    if (!this.dialog_.open) {
      this.setOpen(true);
      this.focus_();
    }
  },

  /**
   * Show this dialog modally.
   */
  showModal: function() {
    if (this.dialog_.hasAttribute('open')) {
      throw new Error('Failed to execute \'showModal\' on dialog: The element is already open, and therefore cannot be opened modally.');
    }
    if (!isConnected(this.dialog_)) {
      throw new Error('Failed to execute \'showModal\' on dialog: The element is not in a Document.');
    }
    if (!dialogPolyfill.dm.pushDialog(this)) {
      throw new Error('Failed to execute \'showModal\' on dialog: There are too many open modal dialogs.');
    }

    if (createsStackingContext(this.dialog_.parentElement)) {
      console.warn('A dialog is being shown inside a stacking context. ' +
          'This may cause it to be unusable. For more information, see this link: ' +
          'https://github.com/GoogleChrome/dialog-polyfill/#stacking-context');
    }

    this.setOpen(true);
    this.openAsModal_ = true;

    // Optionally center vertically, relative to the current viewport.
    if (dialogPolyfill.needsCentering(this.dialog_)) {
      dialogPolyfill.reposition(this.dialog_);
      this.replacedStyleTop_ = true;
    } else {
      this.replacedStyleTop_ = false;
    }

    // Insert backdrop.
    this.dialog_.parentNode.insertBefore(this.backdrop_, this.dialog_.nextSibling);

    // Focus on whatever inside the dialog.
    this.focus_();
  },

  /**
   * Closes this HTMLDialogElement. This is optional vs clearing the open
   * attribute, however this fires a 'close' event.
   *
   * @param {string=} opt_returnValue to use as the returnValue
   */
  close: function(opt_returnValue) {
    if (!this.dialog_.hasAttribute('open')) {
      throw new Error('Failed to execute \'close\' on dialog: The element does not have an \'open\' attribute, and therefore cannot be closed.');
    }
    this.setOpen(false);

    // Leave returnValue untouched in case it was set directly on the element
    if (opt_returnValue !== undefined) {
      this.dialog_.returnValue = opt_returnValue;
    }

    // Triggering "close" event for any attached listeners on the <dialog>.
    var closeEvent = new supportCustomEvent('close', {
      bubbles: false,
      cancelable: false
    });
    safeDispatchEvent(this.dialog_, closeEvent);
  }

});

var dialogPolyfill = {};

dialogPolyfill.reposition = function(element) {
  var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
  var topValue = scrollTop + (window.innerHeight - element.offsetHeight) / 2;
  element.style.top = Math.max(scrollTop, topValue) + 'px';
};

dialogPolyfill.isInlinePositionSetByStylesheet = function(element) {
  for (var i = 0; i < document.styleSheets.length; ++i) {
    var styleSheet = document.styleSheets[i];
    var cssRules = null;
    // Some browsers throw on cssRules.
    try {
      cssRules = styleSheet.cssRules;
    } catch (e) {}
    if (!cssRules) { continue; }
    for (var j = 0; j < cssRules.length; ++j) {
      var rule = cssRules[j];
      var selectedNodes = null;
      // Ignore errors on invalid selector texts.
      try {
        selectedNodes = document.querySelectorAll(rule.selectorText);
      } catch(e) {}
      if (!selectedNodes || !inNodeList(selectedNodes, element)) {
        continue;
      }
      var cssTop = rule.style.getPropertyValue('top');
      var cssBottom = rule.style.getPropertyValue('bottom');
      if ((cssTop && cssTop !== 'auto') || (cssBottom && cssBottom !== 'auto')) {
        return true;
      }
    }
  }
  return false;
};

dialogPolyfill.needsCentering = function(dialog) {
  var computedStyle = window.getComputedStyle(dialog);
  if (computedStyle.position !== 'absolute') {
    return false;
  }

  // We must determine whether the top/bottom specified value is non-auto.  In
  // WebKit/Blink, checking computedStyle.top == 'auto' is sufficient, but
  // Firefox returns the used value. So we do this crazy thing instead: check
  // the inline style and then go through CSS rules.
  if ((dialog.style.top !== 'auto' && dialog.style.top !== '') ||
      (dialog.style.bottom !== 'auto' && dialog.style.bottom !== '')) {
    return false;
  }
  return !dialogPolyfill.isInlinePositionSetByStylesheet(dialog);
};

/**
 * @param {!Element} element to force upgrade
 */
dialogPolyfill.forceRegisterDialog = function(element) {
  if (window.HTMLDialogElement || element.showModal) {
    console.warn('This browser already supports <dialog>, the polyfill ' +
        'may not work correctly', element);
  }
  if (element.localName !== 'dialog') {
    throw new Error('Failed to register dialog: The element is not a dialog.');
  }
  new dialogPolyfillInfo(/** @type {!HTMLDialogElement} */ (element));
};

/**
 * @param {!Element} element to upgrade, if necessary
 */
dialogPolyfill.registerDialog = function(element) {
  if (!element.showModal) {
    dialogPolyfill.forceRegisterDialog(element);
  }
};

/**
 * @constructor
 */
dialogPolyfill.DialogManager = function() {
  /** @type {!Array<!dialogPolyfillInfo>} */
  this.pendingDialogStack = [];

  var checkDOM = this.checkDOM_.bind(this);

  // The overlay is used to simulate how a modal dialog blocks the document.
  // The blocking dialog is positioned on top of the overlay, and the rest of
  // the dialogs on the pending dialog stack are positioned below it. In the
  // actual implementation, the modal dialog stacking is controlled by the
  // top layer, where z-index has no effect.
  this.overlay = document.createElement('div');
  this.overlay.className = '_dialog_overlay';
  this.overlay.addEventListener('click', function(e) {
    this.forwardTab_ = undefined;
    e.stopPropagation();
    checkDOM([]);  // sanity-check DOM
  }.bind(this));

  this.handleKey_ = this.handleKey_.bind(this);
  this.handleFocus_ = this.handleFocus_.bind(this);

  this.zIndexLow_ = 100000;
  this.zIndexHigh_ = 100000 + 150;

  this.forwardTab_ = undefined;

  if ('MutationObserver' in window) {
    this.mo_ = new MutationObserver(function(records) {
      var removed = [];
      records.forEach(function(rec) {
        for (var i = 0, c; c = rec.removedNodes[i]; ++i) {
          if (!(c instanceof Element)) {
            continue;
          } else if (c.localName === 'dialog') {
            removed.push(c);
          }
          removed = removed.concat(c.querySelectorAll('dialog'));
        }
      });
      removed.length && checkDOM(removed);
    });
  }
};

/**
 * Called on the first modal dialog being shown. Adds the overlay and related
 * handlers.
 */
dialogPolyfill.DialogManager.prototype.blockDocument = function() {
  document.documentElement.addEventListener('focus', this.handleFocus_, true);
  document.addEventListener('keydown', this.handleKey_);
  this.mo_ && this.mo_.observe(document, {childList: true, subtree: true});
};

/**
 * Called on the first modal dialog being removed, i.e., when no more modal
 * dialogs are visible.
 */
dialogPolyfill.DialogManager.prototype.unblockDocument = function() {
  document.documentElement.removeEventListener('focus', this.handleFocus_, true);
  document.removeEventListener('keydown', this.handleKey_);
  this.mo_ && this.mo_.disconnect();
};

/**
 * Updates the stacking of all known dialogs.
 */
dialogPolyfill.DialogManager.prototype.updateStacking = function() {
  var zIndex = this.zIndexHigh_;

  for (var i = 0, dpi; dpi = this.pendingDialogStack[i]; ++i) {
    dpi.updateZIndex(--zIndex, --zIndex);
    if (i === 0) {
      this.overlay.style.zIndex = --zIndex;
    }
  }

  // Make the overlay a sibling of the dialog itself.
  var last = this.pendingDialogStack[0];
  if (last) {
    var p = last.dialog.parentNode || document.body;
    p.appendChild(this.overlay);
  } else if (this.overlay.parentNode) {
    this.overlay.parentNode.removeChild(this.overlay);
  }
};

/**
 * @param {Element} candidate to check if contained or is the top-most modal dialog
 * @return {boolean} whether candidate is contained in top dialog
 */
dialogPolyfill.DialogManager.prototype.containedByTopDialog_ = function(candidate) {
  while (candidate = findNearestDialog(candidate)) {
    for (var i = 0, dpi; dpi = this.pendingDialogStack[i]; ++i) {
      if (dpi.dialog === candidate) {
        return i === 0;  // only valid if top-most
      }
    }
    candidate = candidate.parentElement;
  }
  return false;
};

dialogPolyfill.DialogManager.prototype.handleFocus_ = function(event) {
  var target = event.composedPath ? event.composedPath()[0] : event.target;

  if (this.containedByTopDialog_(target)) { return; }

  if (document.activeElement === document.documentElement) { return; }

  event.preventDefault();
  event.stopPropagation();
  safeBlur(/** @type {Element} */ (target));

  if (this.forwardTab_ === undefined) { return; }  // move focus only from a tab key

  var dpi = this.pendingDialogStack[0];
  var dialog = dpi.dialog;
  var position = dialog.compareDocumentPosition(target);
  if (position & Node.DOCUMENT_POSITION_PRECEDING) {
    if (this.forwardTab_) {
      // forward
      dpi.focus_();
    } else if (target !== document.documentElement) {
      // backwards if we're not already focused on <html>
      document.documentElement.focus();
    }
  }

  return false;
};

dialogPolyfill.DialogManager.prototype.handleKey_ = function(event) {
  this.forwardTab_ = undefined;
  if (event.keyCode === 27) {
    event.preventDefault();
    event.stopPropagation();
    var cancelEvent = new supportCustomEvent('cancel', {
      bubbles: false,
      cancelable: true
    });
    var dpi = this.pendingDialogStack[0];
    if (dpi && safeDispatchEvent(dpi.dialog, cancelEvent)) {
      dpi.dialog.close();
    }
  } else if (event.keyCode === 9) {
    this.forwardTab_ = !event.shiftKey;
  }
};

/**
 * Finds and downgrades any known modal dialogs that are no longer displayed. Dialogs that are
 * removed and immediately readded don't stay modal, they become normal.
 *
 * @param {!Array<!HTMLDialogElement>} removed that have definitely been removed
 */
dialogPolyfill.DialogManager.prototype.checkDOM_ = function(removed) {
  // This operates on a clone because it may cause it to change. Each change also calls
  // updateStacking, which only actually needs to happen once. But who removes many modal dialogs
  // at a time?!
  var clone = this.pendingDialogStack.slice();
  clone.forEach(function(dpi) {
    if (removed.indexOf(dpi.dialog) !== -1) {
      dpi.downgradeModal();
    } else {
      dpi.maybeHideModal();
    }
  });
};

/**
 * @param {!dialogPolyfillInfo} dpi
 * @return {boolean} whether the dialog was allowed
 */
dialogPolyfill.DialogManager.prototype.pushDialog = function(dpi) {
  var allowed = (this.zIndexHigh_ - this.zIndexLow_) / 2 - 1;
  if (this.pendingDialogStack.length >= allowed) {
    return false;
  }
  if (this.pendingDialogStack.unshift(dpi) === 1) {
    this.blockDocument();
  }
  this.updateStacking();
  return true;
};

/**
 * @param {!dialogPolyfillInfo} dpi
 */
dialogPolyfill.DialogManager.prototype.removeDialog = function(dpi) {
  var index = this.pendingDialogStack.indexOf(dpi);
  if (index === -1) { return; }

  this.pendingDialogStack.splice(index, 1);
  if (this.pendingDialogStack.length === 0) {
    this.unblockDocument();
  }
  this.updateStacking();
};

dialogPolyfill.dm = new dialogPolyfill.DialogManager();
dialogPolyfill.formSubmitter = null;
dialogPolyfill.imagemapUseValue = null;

/**
 * Installs global handlers, such as click listers and native method overrides. These are needed
 * even if a no dialog is registered, as they deal with <form method="dialog">.
 */
if (window.HTMLDialogElement === undefined) {

  /**
   * If HTMLFormElement translates method="DIALOG" into 'get', then replace the descriptor with
   * one that returns the correct value.
   */
  var testForm = document.createElement('form');
  testForm.setAttribute('method', 'dialog');
  if (testForm.method !== 'dialog') {
    var methodDescriptor = Object.getOwnPropertyDescriptor(HTMLFormElement.prototype, 'method');
    if (methodDescriptor) {
      // nb. Some older iOS and older PhantomJS fail to return the descriptor. Don't do anything
      // and don't bother to update the element.
      var realGet = methodDescriptor.get;
      methodDescriptor.get = function() {
        if (isFormMethodDialog(this)) {
          return 'dialog';
        }
        return realGet.call(this);
      };
      var realSet = methodDescriptor.set;
      /** @this {HTMLElement} */
      methodDescriptor.set = function(v) {
        if (typeof v === 'string' && v.toLowerCase() === 'dialog') {
          return this.setAttribute('method', v);
        }
        return realSet.call(this, v);
      };
      Object.defineProperty(HTMLFormElement.prototype, 'method', methodDescriptor);
    }
  }

  /**
   * Global 'click' handler, to capture the <input type="submit"> or <button> element which has
   * submitted a <form method="dialog">. Needed as Safari and others don't report this inside
   * document.activeElement.
   */
  document.addEventListener('click', function(ev) {
    dialogPolyfill.formSubmitter = null;
    dialogPolyfill.imagemapUseValue = null;
    if (ev.defaultPrevented) { return; }  // e.g. a submit which prevents default submission

    var target = /** @type {Element} */ (ev.target);
    if ('composedPath' in ev) {
      var path = ev.composedPath();
      target = path.shift() || target;
    }
    if (!target || !isFormMethodDialog(target.form)) { return; }

    var valid = (target.type === 'submit' && ['button', 'input'].indexOf(target.localName) > -1);
    if (!valid) {
      if (!(target.localName === 'input' && target.type === 'image')) { return; }
      // this is a <input type="image">, which can submit forms
      dialogPolyfill.imagemapUseValue = ev.offsetX + ',' + ev.offsetY;
    }

    var dialog = findNearestDialog(target);
    if (!dialog) { return; }

    dialogPolyfill.formSubmitter = target;

  }, false);

  /**
   * Global 'submit' handler. This handles submits of `method="dialog"` which are invalid, i.e.,
   * outside a dialog. They get prevented.
   */
  document.addEventListener('submit', function(ev) {
    var form = ev.target;
    var dialog = findNearestDialog(form);
    if (dialog) {
      return;  // ignore, handle there
    }

    var submitter = findFormSubmitter(ev);
    var formmethod = submitter && submitter.getAttribute('formmethod') || form.getAttribute('method');
    if (formmethod === 'dialog') {
      ev.preventDefault();
    }
  });

  /**
   * Replace the native HTMLFormElement.submit() method, as it won't fire the
   * submit event and give us a chance to respond.
   */
  var nativeFormSubmit = HTMLFormElement.prototype.submit;
  var replacementFormSubmit = function () {
    if (!isFormMethodDialog(this)) {
      return nativeFormSubmit.call(this);
    }
    var dialog = findNearestDialog(this);
    dialog && dialog.close();
  };
  HTMLFormElement.prototype.submit = replacementFormSubmit;
}

/* harmony default export */ __webpack_exports__["default"] = (dialogPolyfill);


/***/ }),

/***/ 0:
/***/ (function(module, exports) {

module.exports = React;

/***/ }),

/***/ 1:
/***/ (function(module, exports) {

module.exports = CraftJsCore;

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

module.exports = Injector;

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

module.exports = ReactDom;

/***/ }),

/***/ 4:
/***/ (function(module, exports) {

module.exports = CraftJsUtils;

/***/ }),

/***/ 5:
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map