const isProd = process.env.NODE_ENV === 'production';

// https://cli.vuejs.org/config
module.exports = {
	publicPath: isProd ? '/Spotify-Artist-Explorer/' : '/',
	devServer: {
		clientLogLevel: 'silent', // ValidationError: webpack Dev Server Invalid Options :(
	},
	configureWebpack: (webpackConfig) => {
		if (!isProd) {
			webpackConfig.devtool = 'source-map';
		}
	},
};
