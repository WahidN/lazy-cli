const merge = require('webpack-merge');
const baseConfig = require('./webpack.common.js');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const Critters = require('critters-webpack-plugin');

module.exports = merge(baseConfig, {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.(scss|css)$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader'
					},
					{
						loader: 'sass-loader'
					}
				]
            }
        ]
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
            sourceMap: true,
            cache: true
        }),
        new OptimizeCSSAssetsPlugin({})
    ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "style.css"
        }),
        new Critters()
    ]
});