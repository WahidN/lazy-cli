const merge = require('webpack-merge');
const baseConfig = require('./webpack.common.js');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(baseConfig, {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.(sa|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',                    
                    'css-loader'
                ]
            }
        ]
    },
    optimization: {
        minimizer: [new UglifyJsPlugin({
            sourceMap: true,
            cache: true
        })],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "style.css"
        })
    ]
});

