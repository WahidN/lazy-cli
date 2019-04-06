const merge = require('webpack-merge');
const baseConfig = require('./webpack.common.js');

module.exports = merge(baseConfig, {
    optimization: {
        minimizer: [new UglifyJsPlugin({
            sourceMap: true,
            cache: true
        })],
    }
});

