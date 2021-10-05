const Path = require("path")
const webpackConfig = require("@silverstripe/webpack-config")
const {
	resolveJS,
	externalJS,
	moduleJS,
	pluginJS,
	moduleCSS,
	pluginCSS,
} = webpackConfig

const ENV = process.env.NODE_ENV
const PATHS = {
	MODULES: "node_modules",
	FILES_PATH: "../",
	// TODO this module is developed outside of the silverstripe directory which is hardcoded here to be www
	ROOT: Path.resolve("../www"),
	SRC: Path.resolve("client/src"),
	DIST: Path.resolve("client/dist"),
}

const externals = externalJS(ENV, PATHS)
delete externals.reactstrap
const externalsVendor = JSON.parse(JSON.stringify(externals))
externals["@craftjs/core"] = "CraftJsCore"
externals["@craftjs/utils"] = "CraftJsUtils"

const _moduleJS = moduleJS(ENV, PATHS)
_moduleJS.rules[0].exclude = [
	{
		test: _moduleJS.rules[0].exclude,
		exclude: new RegExp(`(node_modules/nanoid)`),
	},
]

const _resolvJS = resolveJS(ENV, PATHS)

const config = [
	{
		name: "js",
		entry: {
			bundle: `${PATHS.SRC}/bundles/bundle.js`,
		},
		output: {
			path: PATHS.DIST,
			filename: "js/[name].js",
		},
		devtool: (ENV !== "production") ? "source-map" : "",
		resolve: _resolvJS,
		externals,
		module: _moduleJS,
		plugins: pluginJS(ENV, PATHS),
	},
	{
		name: "vendorJs",
		entry: {
			vendor: `${PATHS.SRC}/bundles/vendor.js`,
		},
		output: {
			path: PATHS.DIST,
			filename: "js/[name].js",
		},
		devtool: (ENV !== "production") ? "source-map" : "",
		resolve: _resolvJS,
		externals: externalsVendor,
		module: _moduleJS,
		plugins: pluginJS(ENV, PATHS),
	},
	{
		name: "css",
		entry: {
			bundle: `${PATHS.SRC}/bundles/bundle.scss`,
		},
		output: {
			path: PATHS.DIST,
			filename: "styles/[name].css",
		},
		devtool: (ENV !== "production") ? "source-map" : "",
		module: moduleCSS(ENV, PATHS),
		plugins: pluginCSS(ENV, PATHS),
	},
]

// Use WEBPACK_CHILD=js or WEBPACK_CHILD=css env var to run a single config
module.exports = (process.env.WEBPACK_CHILD)
	? config.find((entry) => entry.name === process.env.WEBPACK_CHILD)
	: module.exports = config
