!function(e){function t(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,t),r.l=!0,r.exports}var n={};t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:o})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s="./client/src/bundles/bundle.js")}({"./client/src/boot/index.js":function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}var r=n(2),a=o(r),i=n("./client/src/components/PageBuilderField.js"),l=o(i);window.document.addEventListener("DOMContentLoaded",function(){a.default.component.registerMany({PageBuilderField:l.default})})},"./client/src/bundles/bundle.js":function(e,t,n){"use strict";n("./client/src/legacy/entwine.js"),n("./client/src/boot/index.js"),n("./client/src/styles/global.scss")},"./client/src/components/PageBuilderField.js":function(e,t,n){"use strict";function o(){return a.default.createElement("div",{className:"page-container"},a.default.createElement(i.Editor,{resolver:{Button:u.Button,Text:f.Text,Container:c.Container},onRender:m.RenderNode},a.default.createElement(d.Topbar,null),a.default.createElement(i.Frame,null,a.default.createElement(i.Element,{canvas:!0,is:c.Container,padding:5,background:"#eeeeee"},a.default.createElement(f.Text,{fontSize:20,text:"test","data-cy":"frame-text"}))),a.default.createElement("div",{style:{display:"flex"}},a.default.createElement("div",{style:{paddingTop:"10px"}},a.default.createElement(s.Toolbox,null)),a.default.createElement("div",{style:{paddingTop:"10px"}},a.default.createElement(l.SettingsPanel,null)))))}Object.defineProperty(t,"__esModule",{value:!0}),t.Component=void 0;var r=n(0),a=function(e){return e&&e.__esModule?e:{default:e}}(r),i=n(1),l=n("./client/src/components/editor/SettingsPanel.js"),s=n("./client/src/components/editor/Toolbox.js"),d=n("./client/src/components/editor/Topbar.js"),u=n("./client/src/components/user/Button.js"),c=n("./client/src/components/user/Container.js"),f=n("./client/src/components/user/Text.js"),m=n("./client/src/components/editor/RenderNode.js");t.Component=o,t.default=o},"./client/src/components/editor/RenderNode.js":function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.RenderNode=void 0;var r=n(1),a=n(4),i=n(0),l=o(i),s=n(3),d=o(s),u=n("./client/src/components/editor/RenderNode.module.scss"),c=o(u);t.RenderNode=function(e){var t=e.render,n=(0,r.useNode)(),o=n.id,s=(0,r.useEditor)(function(e){return{isActive:e.nodes[o]&&e.nodes[o].events.selected}}),u=s.actions,f=s.query,m=s.isActive,p=(0,r.useNode)(function(e){return{isHover:e.events.hovered,dom:e.dom,name:e.data.custom.displayName||e.data.displayName,moveable:f.node(e.id).isDraggable(),deletable:f.node(e.id).isDeletable(),parent:e.data.parent,props:e.data.props}}),g=p.dom,h=p.name,v=p.moveable,b=p.deletable,y=p.connectors.drag,E=p.parent,_=(0,i.useRef)();(0,i.useEffect)(function(){g&&(m?g.classList.add("todo-component-selected"):g.classList.remove("todo-component-selected"))},[g,m,!1]);var w=(0,i.useCallback)(function(e){var t=e?e.getBoundingClientRect():{top:0,left:0,bottom:0},n=t.top,o=t.left,r=t.bottom;return{top:(n>0?n:r)+"px",left:o+"px"}},[]),x=(0,i.useCallback)(function(){var e=_.current;if(e){var t=w(g),n=t.top,o=t.left;e.style.top=n,e.style.left=o}},[g,w]);return(0,i.useEffect)(function(){var e=document.querySelector(".cms .cms-content-fields");return e.addEventListener("scroll",x),function(){e.removeEventListener("scroll",x)}},[x]),l.default.createElement(l.default.Fragment,null,m?d.default.createPortal(l.default.createElement("div",{ref:_,className:c.default.indicator,style:{left:w(g).left,top:w(g).top,zIndex:9999}},l.default.createElement("h2",null,h),v?l.default.createElement("a",{ref:y},"Move"):null,o!==a.ROOT_NODE&&l.default.createElement("a",{role:"button",tabIndex:0,onClick:function(){u.selectNode(E)}},"Go Up"),b?l.default.createElement("a",{role:"button",tabIndex:0,onMouseDown:function(e){e.stopPropagation(),u.delete(o)}},"Delete"):null),document.querySelector(".page-container")):null,t)}},"./client/src/components/editor/RenderNode.module.scss":function(e,t){e.exports={indicator:"_3CQwTsTkOBRkxGMnrda0LJ"}},"./client/src/components/editor/SettingsPanel.js":function(e,t,n){"use strict";function o(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}Object.defineProperty(t,"__esModule",{value:!0}),t.SettingsPanel=void 0;var r=n(1),a=n(0),i=function(e){return e&&e.__esModule?e:{default:e}}(a);t.SettingsPanel=function(){var e=(0,r.useEditor)(function(e,t){var n=void 0,r=e.events.selected;if(r.size>1)throw new Error("ERROR: cannot handle selection of multiple nodes");1===r.size&&(n=[].concat(o(r))[0]);var a=void 0;return n&&(a={id:n,name:e.nodes[n].data.name,settings:e.nodes[n].related&&e.nodes[n].related.settings,isDeletable:t.node(n).isDeletable()}),{selected:a,isEnabled:e.options.enabled}}),t=e.selected;return e.isEnabled&&t?i.default.createElement("div",{style:{marginTop:2,padding:2,background:"rgba(0, 0, 0, 0.06)"}},i.default.createElement("div",{style:{display:"flex",flexDirection:"column"}},i.default.createElement("div",{style:{background:"yellow",padding:2,margin:5}},"Selected: ",t.name),i.default.createElement("div",{style:{background:"yellow",padding:2,margin:5}},t.settings&&i.default.createElement(t.settings)))):null}},"./client/src/components/editor/Toolbox.js":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.Toolbox=void 0;var o=n(1),r=n(0),a=function(e){return e&&e.__esModule?e:{default:e}}(r),i=n("./client/src/components/user/Button.js"),l=n("./client/src/components/user/Container.js"),s=n("./client/src/components/user/Text.js");t.Toolbox=function(){var e=(0,o.useEditor)(),t=e.connectors;return a.default.createElement("div",{style:{padding:2,background:"green"}},a.default.createElement("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",justifyItems:"center"}},a.default.createElement("div",null,a.default.createElement("button",{ref:function(e){return t.create(e,a.default.createElement(i.Button,{text:"Click me",size:"small"}))}},"Button")),a.default.createElement("div",null,a.default.createElement("button",{ref:function(e){return t.create(e,a.default.createElement(s.Text,{text:"Hi world"}))}},"Text")),a.default.createElement("div",null,a.default.createElement("button",{ref:function(e){return t.create(e,a.default.createElement(o.Element,{canvas:!0,is:l.Container,padding:20}))}},"Container"))))}},"./client/src/components/editor/Topbar.js":function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.Topbar=void 0;var r=function(){function e(e,t){var n=[],o=!0,r=!1,a=void 0;try{for(var i,l=e[Symbol.iterator]();!(o=(i=l.next()).done)&&(n.push(i.value),!t||n.length!==t);o=!0);}catch(e){r=!0,a=e}finally{try{!o&&l.return&&l.return()}finally{if(r)throw a}}return n}return function(t,n){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),a=n(1),i=n(0),l=o(i),s=n("./node_modules/dialog-polyfill/dist/dialog-polyfill.esm.js"),d=o(s);t.Topbar=function(){var e=(0,a.useEditor)(function(e,t){return{enabled:e.options.enabled,canUndo:e.options.enabled&&t.history.canUndo(),canRedo:e.options.enabled&&t.history.canRedo()}}),t=e.actions,n=e.query,o=e.canUndo,s=e.canRedo,u=(0,i.useState)(""),c=r(u,2),f=c[0],m=c[1],p=l.default.createRef(),g=l.default.useCallback(function(e){if("submit"===e.target.returnValue){var n=f;t.deserialize(n),alert("State loaded")}else alert("canceled")},[]);return l.default.useEffect(function(){return p.current.addEventListener("close",g),d.default.registerDialog(p.current),function(){p.current.removeEventListener("close",g)}},[]),l.default.createElement("div",{style:{padding:1,margin:"3px 0 1px",background:"#cbe8e7"}},l.default.createElement("div",{style:{display:"flex",alignItems:"center"}},l.default.createElement("button",{style:{marginRight:"10px"},disabled:!o,onClick:function(){return t.history.undo()}},"Undo"),l.default.createElement("button",{style:{marginRight:"10px"},disabled:!s,onClick:function(){return t.history.redo()}},"Redo"),l.default.createElement("button",{style:{marginRight:"10px"},onClick:function(){var e=n.serialize();alert(e)}},"Copy current state"),l.default.createElement("button",{onClick:function(e){e.preventDefault(),p.current.showModal()}},"Load state"),l.default.createElement("dialog",{ref:p},l.default.createElement("form",{method:"dialog"},l.default.createElement("textarea",{name:"content",value:f,onChange:function(e){return m(e.target.value)}}),l.default.createElement("button",{name:"cancel",value:"cancel"},"cancel"),l.default.createElement("button",{name:"submit",value:"submit"},"submit")))))}},"./client/src/components/user/Button.js":function(e,t,n){"use strict";function o(e,t){var n={};for(var o in e)t.indexOf(o)>=0||Object.prototype.hasOwnProperty.call(e,o)&&(n[o]=e[o]);return n}Object.defineProperty(t,"__esModule",{value:!0}),t.ButtonDefaultProps=t.ButtonSettings=t.Button=void 0;var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},a=n(1),i=n(0),l=function(e){return e&&e.__esModule?e:{default:e}}(i),s=function(e){var t=e.size,n=e.variant,i=e.color,s=e.text,d=o(e,["size","variant","color","text"]),u=(0,a.useNode)(),c=u.connectors.connect;return l.default.createElement("button",r({ref:function(e){return c(e)},style:{margin:"5px"},color:i},d),s," (size: ",t,", variant: ",n,")")};t.Button=s;var d=t.ButtonSettings=function(){var e=(0,a.useNode)(function(e){return{props:e.data.props}}),t=e.actions.setProp,n=e.props;return l.default.createElement("div",null,l.default.createElement("fieldset",null,l.default.createElement("legend",null,"Size"),l.default.createElement("select",{value:n.size,onChange:function(e){return t(function(t){t.size=e.target.value})}},l.default.createElement("option",{value:"small"},"Small"),l.default.createElement("option",{value:"medium"},"Medium"),l.default.createElement("option",{value:"large"},"Large"))),l.default.createElement("fieldset",null,l.default.createElement("legend",null,"Variant"),l.default.createElement("select",{value:n.variant,onChange:function(e){return t(function(t){t.variant=e.target.value})}},l.default.createElement("option",{value:"text"},"Text"),l.default.createElement("option",{value:"outlined"},"Outlined"),l.default.createElement("option",{value:"contained"},"Contained"))),l.default.createElement("fieldset",null,l.default.createElement("legend",null,"Color"),l.default.createElement("select",{value:n.color,onChange:function(e){return t(function(t){t.color=e.target.value})}},l.default.createElement("option",{value:"default"},"Default"),l.default.createElement("option",{value:"primary"},"Primary"),l.default.createElement("option",{value:"secondary"},"Secondary"))))};s.craft={props:t.ButtonDefaultProps={size:"small",variant:"contained",color:"primary",text:"Click me"},related:{settings:d}}},"./client/src/components/user/Container.js":function(e,t,n){"use strict";function o(e,t){var n={};for(var o in e)t.indexOf(o)>=0||Object.prototype.hasOwnProperty.call(e,o)&&(n[o]=e[o]);return n}Object.defineProperty(t,"__esModule",{value:!0}),t.ContainerDefaultProps=t.ContainerSettings=t.Container=void 0;var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},a=n(1),i=n(0),l=function(e){return e&&e.__esModule?e:{default:e}}(i),s=function(e){var t=e.background,n=e.padding,i=e.children,s=o(e,["background","padding","children"]),d=(0,a.useNode)(),u=d.connectors.connect;return l.default.createElement("div",r({},s,{ref:function(e){return u(e)},style:{margin:"15px 0",background:t,padding:n+"px"}}),i)};t.Container=s;var d=t.ContainerSettings=function(){return l.default.createElement("div",null,"Settings TODO")};s.craft={props:t.ContainerDefaultProps={background:"#ffffff",padding:15},related:{settings:d}}},"./client/src/components/user/Text.js":function(e,t,n){"use strict";function o(e,t){var n={};for(var o in e)t.indexOf(o)>=0||Object.prototype.hasOwnProperty.call(e,o)&&(n[o]=e[o]);return n}Object.defineProperty(t,"__esModule",{value:!0}),t.TextDefaultProps=t.Text=void 0;var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},a=n(1),i=n(0),l=function(e){return e&&e.__esModule?e:{default:e}}(i),s=function(e){var t=e.text,n=e.fontSize,i=e.textAlign,s=o(e,["text","fontSize","textAlign"]),d=(0,a.useNode)(function(e){return{selected:e.events.selected,dragged:e.events.dragged}}),u=d.connectors.connect,c=d.actions.setProp;return l.default.createElement("div",r({},s,{ref:function(e){return u(e)},style:{position:"relative"}}),l.default.createElement("textarea",{value:t,disabled:!1,style:{fontSize:n+"px",textAlign:i},onChange:function(e){var t=e.target.value.replace(/<\/?[^>]+(>|$)/g,"");c(function(e){e.text=t},500)}}))};t.Text=s;var d=function(){return l.default.createElement("div",null)};s.craft={props:t.TextDefaultProps={text:"Hi",fontSize:20},related:{settings:d}}},"./client/src/legacy/entwine.js":function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}var r=n(5),a=o(r),i=n(0),l=o(i),s=n(3),d=o(s),u=n(2);a.default.entwine("ss",function(e){e(".js-injector-boot .form__field-holder .zauberfisch__page-builder__field").entwine({onmatch:function(){var e=(0,u.loadComponent)("PageBuilderField"),t={};d.default.render(l.default.createElement(e,t),this[0])},onunmatch:function(){d.default.unmountComponentAtNode(this[0])}})})},"./client/src/styles/global.scss":function(e,t){},"./node_modules/dialog-polyfill/dist/dialog-polyfill.esm.js":function(e,t,n){"use strict";function o(e,t){var n="on"+t.type.toLowerCase();return"function"==typeof e[n]&&e[n](t),e.dispatchEvent(t)}function r(e){for(;e&&e!==document.body;){var t=window.getComputedStyle(e),n=function(e,n){return!(void 0===t[e]||t[e]===n)};if(t.opacity<1||n("zIndex","auto")||n("transform","none")||n("mixBlendMode","normal")||n("filter","none")||n("perspective","none")||"isolate"===t.isolation||"fixed"===t.position||"touch"===t.webkitOverflowScrolling)return!0;e=e.parentElement}return!1}function a(e){for(;e;){if("dialog"===e.localName)return e;e=e.parentElement?e.parentElement:e.parentNode?e.parentNode.host:null}return null}function i(e){for(;e&&e.shadowRoot&&e.shadowRoot.activeElement;)e=e.shadowRoot.activeElement;e&&e.blur&&e!==document.body&&e.blur()}function l(e,t){for(var n=0;n<e.length;++n)if(e[n]===t)return!0;return!1}function s(e){return!(!e||!e.hasAttribute("method"))&&"dialog"===e.getAttribute("method").toLowerCase()}function d(e){var t=["button","input","keygen","select","textarea"],n=t.map(function(e){return e+":not([disabled])"});n.push('[tabindex]:not([disabled]):not([tabindex=""])');var o=e.querySelector(n.join(", "));if(!o&&"attachShadow"in Element.prototype)for(var r=e.querySelectorAll("*"),a=0;a<r.length&&!(r[a].tagName&&r[a].shadowRoot&&(o=d(r[a].shadowRoot)));a++);return o}function u(e){return e.isConnected||document.body.contains(e)}function c(e){if(e.submitter)return e.submitter;var t=e.target;if(!(t instanceof HTMLFormElement))return null;var n=g.formSubmitter;if(!n){var o=e.target;n=("getRootNode"in o&&o.getRootNode()||document).activeElement}return n&&n.form===t?n:null}function f(e){if(!e.defaultPrevented){var t=e.target,n=g.imagemapUseValue,o=c(e);null===n&&o&&(n=o.value);var r=a(t);r&&"dialog"===(o&&o.getAttribute("formmethod")||t.getAttribute("method"))&&(e.preventDefault(),null!=n?r.close(n):r.close())}}function m(e){if(this.dialog_=e,this.replacedStyleTop_=!1,this.openAsModal_=!1,e.hasAttribute("role")||e.setAttribute("role","dialog"),e.show=this.show.bind(this),e.showModal=this.showModal.bind(this),e.close=this.close.bind(this),e.addEventListener("submit",f,!1),"returnValue"in e||(e.returnValue=""),"MutationObserver"in window)new MutationObserver(this.maybeHideModal.bind(this)).observe(e,{attributes:!0,attributeFilter:["open"]});else{var t,n=!1,o=function(){n?this.downgradeModal():this.maybeHideModal(),n=!1}.bind(this),r=function(r){if(r.target===e){var a="DOMNodeRemoved";n|=r.type.substr(0,a.length)===a,window.clearTimeout(t),t=window.setTimeout(o,0)}};["DOMAttrModified","DOMNodeRemoved","DOMNodeRemovedFromDocument"].forEach(function(t){e.addEventListener(t,r)})}Object.defineProperty(e,"open",{set:this.setOpen.bind(this),get:e.hasAttribute.bind(e,"open")}),this.backdrop_=document.createElement("div"),this.backdrop_.className="backdrop",this.backdrop_.addEventListener("mouseup",this.backdropMouseEvent_.bind(this)),this.backdrop_.addEventListener("mousedown",this.backdropMouseEvent_.bind(this)),this.backdrop_.addEventListener("click",this.backdropMouseEvent_.bind(this))}Object.defineProperty(t,"__esModule",{value:!0});var p=window.CustomEvent;p&&"object"!=typeof p||(p=function(e,t){t=t||{};var n=document.createEvent("CustomEvent");return n.initCustomEvent(e,!!t.bubbles,!!t.cancelable,t.detail||null),n},p.prototype=window.Event.prototype),m.prototype={get dialog(){return this.dialog_},maybeHideModal:function(){this.dialog_.hasAttribute("open")&&u(this.dialog_)||this.downgradeModal()},downgradeModal:function(){this.openAsModal_&&(this.openAsModal_=!1,this.dialog_.style.zIndex="",this.replacedStyleTop_&&(this.dialog_.style.top="",this.replacedStyleTop_=!1),this.backdrop_.parentNode&&this.backdrop_.parentNode.removeChild(this.backdrop_),g.dm.removeDialog(this))},setOpen:function(e){e?this.dialog_.hasAttribute("open")||this.dialog_.setAttribute("open",""):(this.dialog_.removeAttribute("open"),this.maybeHideModal())},backdropMouseEvent_:function(e){if(this.dialog_.hasAttribute("tabindex"))this.dialog_.focus();else{var t=document.createElement("div");this.dialog_.insertBefore(t,this.dialog_.firstChild),t.tabIndex=-1,t.focus(),this.dialog_.removeChild(t)}var n=document.createEvent("MouseEvents");n.initMouseEvent(e.type,e.bubbles,e.cancelable,window,e.detail,e.screenX,e.screenY,e.clientX,e.clientY,e.ctrlKey,e.altKey,e.shiftKey,e.metaKey,e.button,e.relatedTarget),this.dialog_.dispatchEvent(n),e.stopPropagation()},focus_:function(){var e=this.dialog_.querySelector("[autofocus]:not([disabled])");!e&&this.dialog_.tabIndex>=0&&(e=this.dialog_),e||(e=d(this.dialog_)),i(document.activeElement),e&&e.focus()},updateZIndex:function(e,t){if(e<t)throw new Error("dialogZ should never be < backdropZ");this.dialog_.style.zIndex=e,this.backdrop_.style.zIndex=t},show:function(){this.dialog_.open||(this.setOpen(!0),this.focus_())},showModal:function(){if(this.dialog_.hasAttribute("open"))throw new Error("Failed to execute 'showModal' on dialog: The element is already open, and therefore cannot be opened modally.");if(!u(this.dialog_))throw new Error("Failed to execute 'showModal' on dialog: The element is not in a Document.");if(!g.dm.pushDialog(this))throw new Error("Failed to execute 'showModal' on dialog: There are too many open modal dialogs.");r(this.dialog_.parentElement)&&console.warn("A dialog is being shown inside a stacking context. This may cause it to be unusable. For more information, see this link: https://github.com/GoogleChrome/dialog-polyfill/#stacking-context"),this.setOpen(!0),this.openAsModal_=!0,g.needsCentering(this.dialog_)?(g.reposition(this.dialog_),this.replacedStyleTop_=!0):this.replacedStyleTop_=!1,this.dialog_.parentNode.insertBefore(this.backdrop_,this.dialog_.nextSibling),this.focus_()},close:function(e){if(!this.dialog_.hasAttribute("open"))throw new Error("Failed to execute 'close' on dialog: The element does not have an 'open' attribute, and therefore cannot be closed.");this.setOpen(!1),void 0!==e&&(this.dialog_.returnValue=e);var t=new p("close",{bubbles:!1,cancelable:!1});o(this.dialog_,t)}};var g={};if(g.reposition=function(e){var t=document.body.scrollTop||document.documentElement.scrollTop,n=t+(window.innerHeight-e.offsetHeight)/2;e.style.top=Math.max(t,n)+"px"},g.isInlinePositionSetByStylesheet=function(e){for(var t=0;t<document.styleSheets.length;++t){var n=document.styleSheets[t],o=null;try{o=n.cssRules}catch(e){}if(o)for(var r=0;r<o.length;++r){var a=o[r],i=null;try{i=document.querySelectorAll(a.selectorText)}catch(e){}if(i&&l(i,e)){var s=a.style.getPropertyValue("top"),d=a.style.getPropertyValue("bottom");if(s&&"auto"!==s||d&&"auto"!==d)return!0}}}return!1},g.needsCentering=function(e){return!("absolute"!==window.getComputedStyle(e).position||"auto"!==e.style.top&&""!==e.style.top||"auto"!==e.style.bottom&&""!==e.style.bottom||g.isInlinePositionSetByStylesheet(e))},g.forceRegisterDialog=function(e){if((window.HTMLDialogElement||e.showModal)&&console.warn("This browser already supports <dialog>, the polyfill may not work correctly",e),"dialog"!==e.localName)throw new Error("Failed to register dialog: The element is not a dialog.");new m(e)},g.registerDialog=function(e){e.showModal||g.forceRegisterDialog(e)},g.DialogManager=function(){this.pendingDialogStack=[];var e=this.checkDOM_.bind(this);this.overlay=document.createElement("div"),this.overlay.className="_dialog_overlay",this.overlay.addEventListener("click",function(t){this.forwardTab_=void 0,t.stopPropagation(),e([])}.bind(this)),this.handleKey_=this.handleKey_.bind(this),this.handleFocus_=this.handleFocus_.bind(this),this.zIndexLow_=1e5,this.zIndexHigh_=100150,this.forwardTab_=void 0,"MutationObserver"in window&&(this.mo_=new MutationObserver(function(t){var n=[];t.forEach(function(e){for(var t,o=0;t=e.removedNodes[o];++o)t instanceof Element&&("dialog"===t.localName&&n.push(t),n=n.concat(t.querySelectorAll("dialog")))}),n.length&&e(n)}))},g.DialogManager.prototype.blockDocument=function(){document.documentElement.addEventListener("focus",this.handleFocus_,!0),document.addEventListener("keydown",this.handleKey_),this.mo_&&this.mo_.observe(document,{childList:!0,subtree:!0})},g.DialogManager.prototype.unblockDocument=function(){document.documentElement.removeEventListener("focus",this.handleFocus_,!0),document.removeEventListener("keydown",this.handleKey_),this.mo_&&this.mo_.disconnect()},g.DialogManager.prototype.updateStacking=function(){for(var e,t=this.zIndexHigh_,n=0;e=this.pendingDialogStack[n];++n)e.updateZIndex(--t,--t),0===n&&(this.overlay.style.zIndex=--t);var o=this.pendingDialogStack[0];o?(o.dialog.parentNode||document.body).appendChild(this.overlay):this.overlay.parentNode&&this.overlay.parentNode.removeChild(this.overlay)},g.DialogManager.prototype.containedByTopDialog_=function(e){for(;e=a(e);){for(var t,n=0;t=this.pendingDialogStack[n];++n)if(t.dialog===e)return 0===n;e=e.parentElement}return!1},g.DialogManager.prototype.handleFocus_=function(e){var t=e.composedPath?e.composedPath()[0]:e.target;if(!this.containedByTopDialog_(t)&&document.activeElement!==document.documentElement&&(e.preventDefault(),e.stopPropagation(),i(t),void 0!==this.forwardTab_)){var n=this.pendingDialogStack[0];return n.dialog.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_PRECEDING&&(this.forwardTab_?n.focus_():t!==document.documentElement&&document.documentElement.focus()),!1}},g.DialogManager.prototype.handleKey_=function(e){if(this.forwardTab_=void 0,27===e.keyCode){e.preventDefault(),e.stopPropagation();var t=new p("cancel",{bubbles:!1,cancelable:!0}),n=this.pendingDialogStack[0];n&&o(n.dialog,t)&&n.dialog.close()}else 9===e.keyCode&&(this.forwardTab_=!e.shiftKey)},g.DialogManager.prototype.checkDOM_=function(e){this.pendingDialogStack.slice().forEach(function(t){-1!==e.indexOf(t.dialog)?t.downgradeModal():t.maybeHideModal()})},g.DialogManager.prototype.pushDialog=function(e){var t=(this.zIndexHigh_-this.zIndexLow_)/2-1;return!(this.pendingDialogStack.length>=t||(1===this.pendingDialogStack.unshift(e)&&this.blockDocument(),this.updateStacking(),0))},g.DialogManager.prototype.removeDialog=function(e){var t=this.pendingDialogStack.indexOf(e);-1!==t&&(this.pendingDialogStack.splice(t,1),0===this.pendingDialogStack.length&&this.unblockDocument(),this.updateStacking())},g.dm=new g.DialogManager,g.formSubmitter=null,g.imagemapUseValue=null,void 0===window.HTMLDialogElement){var h=document.createElement("form");if(h.setAttribute("method","dialog"),"dialog"!==h.method){var v=Object.getOwnPropertyDescriptor(HTMLFormElement.prototype,"method");if(v){var b=v.get;v.get=function(){return s(this)?"dialog":b.call(this)};var y=v.set;v.set=function(e){return"string"==typeof e&&"dialog"===e.toLowerCase()?this.setAttribute("method",e):y.call(this,e)},Object.defineProperty(HTMLFormElement.prototype,"method",v)}}document.addEventListener("click",function(e){if(g.formSubmitter=null,g.imagemapUseValue=null,!e.defaultPrevented){var t=e.target;if("composedPath"in e&&(t=e.composedPath().shift()||t),t&&s(t.form)){if(!("submit"===t.type&&["button","input"].indexOf(t.localName)>-1)){if("input"!==t.localName||"image"!==t.type)return;g.imagemapUseValue=e.offsetX+","+e.offsetY}a(t)&&(g.formSubmitter=t)}}},!1),document.addEventListener("submit",function(e){var t=e.target;if(!a(t)){var n=c(e);"dialog"===(n&&n.getAttribute("formmethod")||t.getAttribute("method"))&&e.preventDefault()}});var E=HTMLFormElement.prototype.submit,_=function(){if(!s(this))return E.call(this);var e=a(this);e&&e.close()};HTMLFormElement.prototype.submit=_}t.default=g},0:function(e,t){e.exports=React},1:function(e,t){e.exports=CraftJsCore},2:function(e,t){e.exports=Injector},3:function(e,t){e.exports=ReactDom},4:function(e,t){e.exports=CraftJsUtils},5:function(e,t){e.exports=jQuery}});