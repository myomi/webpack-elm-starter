var path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js'
    },
    module: {
        rules: [{
            test: /\.elm$/,
            exclude: [/elm-stuff/, /node_modules/],
            use: {
                loader: 'elm-webpack-loader',
                options: {}
            }
        }, {
            test: /\.html$/,
            use: {
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }
            }
        }]
    },
    resolve: {
        extensions: ['.js', '.elm']
    }
};