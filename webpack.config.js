const ExtractTextPlugin = require("extract-text-webpack-plugin")
const autoprefixer = require("autoprefixer")
const customProperties = require("postcss-custom-properties")
const Path = require("path")
const webpackConfig = require("@silverstripe/webpack-config")

// Used for autoprefixing css properties (same as Bootstrap Aplha.2 defaults)
const SUPPORTED_BROWSERS = [
	"Chrome >= 35",
	"Firefox >= 31",
	"Edge >= 12",
	"Explorer >= 11",
	"iOS >= 8",
	"Safari >= 8",
	"Android 2.3",
	"Android >= 4",
	"Opera >= 12",
]

const {
	resolveJS,
	externalJS,
	moduleJS,
	pluginJS,
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

const devtool = (ENV !== "production") ? "source-map" : ""

const externals = externalJS(ENV, PATHS)
delete externals.reactstrap
const externalsVendor = JSON.parse(JSON.stringify(externals))
externals["@craftjs/core"] = "CraftJsCore"
externals["@craftjs/utils"] = "CraftJsUtils"

const _module = moduleJS(ENV, PATHS)
_module.rules[0].exclude = [
	{
		test: _module.rules[0].exclude,
		exclude: new RegExp(`(node_modules/nanoid)`),
	},
]

const cssLoader = {
	loader: "css-loader",
	options: {
		sourceMap: true,
		minimize: true,
		discardComments: true,
	},
}
const cssLoaderWithModule = {
	loader: "css-loader",
	options: {
		sourceMap: true,
		minimize: true,
		discardComments: true,
		modules: {
			localIdentName: "[name]__[local]___[hash:base64:5]",
		},
	},
}
const postCssLoader = {
	loader: "postcss-loader",
	options: {
		sourceMap: true,
		plugins: [
			autoprefixer({browsers: SUPPORTED_BROWSERS}),
			customProperties,
		],
	},
}
const sassLoader = {
	loader: "sass-loader",
	options: {
		includePaths: [
			Path.resolve(PATHS.SRC, "styles"),
			Path.resolve(PATHS.ROOT, "vendor/silverstripe/admin/client/src/styles"),
			Path.resolve(PATHS.ROOT, "../admin/client/src/styles"),
			Path.resolve(PATHS.ROOT, "../../silverstripe/admin/client/src/styles"),
		],
		sourceMap: true,
	},
}

_module.rules.push({
	test: /(?<!\.module)\.(scss|sass)$/,
	loader: ExtractTextPlugin.extract({
		publicPath: PATHS.FILES_PATH,
		use: [
			cssLoader,
			postCssLoader,
			sassLoader,
		],
	}),
})
_module.rules.push({
	test: /\.module\.(scss|sass)$/,
	loader: ExtractTextPlugin.extract({
		publicPath: PATHS.FILES_PATH,
		use: [
			cssLoaderWithModule,
			postCssLoader,
			sassLoader,
		],
	}),
})
_module.rules.push({
	test: /(?<!\.module)\.css$/,
	loader: ExtractTextPlugin.extract({
		publicPath: PATHS.FILES_PATH,
		use: [
			cssLoader,
			postCssLoader,
		],
	}),
})
_module.rules.push({
	test: /\.module\.css$/,
	loader: ExtractTextPlugin.extract({
		publicPath: PATHS.FILES_PATH,
		use: [
			cssLoaderWithModule,
			postCssLoader,
		],
	}),
})
const resolve = resolveJS(ENV, PATHS)
const plugins = pluginJS(ENV, PATHS)
plugins.push(
	new ExtractTextPlugin({
		filename: 'styles/[name].css',
		allChunks: true,
	}),
)

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
		devtool,
		resolve,
		externals,
		module: _module,
		plugins,
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
		devtool,
		resolve,
		externals: externalsVendor,
		module: _module,
		plugins,
	},
]

module.exports = config
