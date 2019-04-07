const CleanPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
var CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require("path");
const pkg = require('./package.json');

const configureBabelLoader = (browserList) => {
  return {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
          loader: 'babel-loader',
          options: {
              presets: [
                  [
                      '@babel/preset-env', {
                      modules: false,
                      useBuiltIns: 'entry',
                      targets: {
                          browsers: browserList,
                      },
                  }
                  ],
              ]
          },
      },
  };
};

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "app.js",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {loader: "style-loader" },
          { loader: "css-loader", options: { importLoaders: 1 } },
          {loader: "sass-loader"}
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
          loader: "file-loader"
          }
        ]
      },
      configureBabelLoader(Object.values(pkg.browserslist.legacyBrowsers))
    ]
  },
  plugins: [
    new CleanPlugin(),
    new HtmlWebpackPlugin({
        filename: 'index.html',
        title: 'trump-tweet-game',
        template: './src/index.html',
        favicon: "./src/assets/img/favicon.png"
    }),
    new WebpackPwaManifest({
        name: '{{ projectname }}',
        description: 'PWA manifest',
        background_color: '#ffffff'
    }),
    new WorkboxPlugin.GenerateSW({
        swDest: 'sw.js',
        clientsClaim: true,
        skipWaiting: true,
    }),
    new CopyWebpackPlugin([
      {from:'src/assets/img',to:'assets/img'} 
    ])
  ]
};


