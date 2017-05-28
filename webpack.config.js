

module.exports = {
    entry: ['babel-polyfill', './index.js'],
    output: {
        path: `${__dirname}/build`,
        filename: 'bundle.js'
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
    devServer: {
        port: 8080,
        contentBase: './build',
        inline: true
    }
};