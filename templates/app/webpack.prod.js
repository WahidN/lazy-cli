const merge = require('webpack-merge');
const baseConfig = require('./webpack.common.js');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(baseConfig, {
    mode: 'production',
    optimization: {
        minimizer: [new UglifyJsPlugin({
            sourceMap: true,
            cache: true
        })],
    }
});

