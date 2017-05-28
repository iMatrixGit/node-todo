const webpack = require('webpack');
const path = require('path');
const { removeEmpty } = require('webpack-config-utils');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

module.exports = {
    entry: {
        app: ['babel-polyfill', './index.js'],
        vendor: ['react', 'react-dom', 'ramda']
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.[name].js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: [/node_modules/],
                use: [{
                    loader: 'babel-loader'
                }],
            },
        ]
    },
    plugins: removeEmpty([
        new ProgressBarPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        })
    ]),
    devServer: {
        port: 8080,
        contentBase: './build',
        inline: true
    }
};