// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
// const { ANALYZE } = process.env;
const path = require('path');
const webpack = require('webpack');
const withCSS = require('@zeit/next-css');

module.exports = withCSS({
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      Components: path.resolve(__dirname, 'components/'),
      Store: path.resolve(__dirname, 'components/Store/'),
      Actions: path.resolve(__dirname, 'components/Actions/'),
      Reducers: path.resolve(__dirname, 'components/Reducers/'),
      Styled: path.resolve(__dirname, 'styled/'),
      Lib: path.resolve(__dirname, 'lib/'),
      CONSTANTS: path.resolve(__dirname, 'components/constants/'),
      Assets: path.resolve(__dirname, 'assets/'),
    };
    config.plugins.push(new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-tw|en/));
    // if (ANALYZE) {
    //   	config.plugins.push(new BundleAnalyzerPlugin({
    // 	    analyzerMode: 'server',
    // 	    analyzerPort: 8888,
    // 	    openAnalyzer: true
    // 	}))
    // }

    return config;
  },
});
