const isProd = process.env.NODE_ENV === 'production';

// https://cli.vuejs.org/config
module.exports = {
	publicPath: isProd ? '/spotify-artist-explorer-client/' : '/',
	devServer: {
		clientLogLevel: 'silent', // ValidationError: webpack Dev Server Invalid Options :(
	},
	configureWebpack: (webpackConfig) => {
		if (!isProd) {
			webpackConfig.devtool = 'source-map';
		}
	},
	// pluginOptions: {
	// 	'style-resources-loader': {
	// 		preProcessor: 'scss',
	// 		patterns: [path.resolve(__dirname, './src/styles/global.scss')],
	// 	},
	// },
	// css: {
	// 	loaderOptions: {
	// 		sass: {
	// 			data: `@import "@/styles/import.scss";`,
	// 		},
	// 	},
	// }
};
