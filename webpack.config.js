const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const Stylelint = require('stylelint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');

const extractSass = new ExtractTextPlugin({
    filename: 'app.css'
});

const stylelint = new Stylelint();

const html = new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'src/index.html',
    hash: true
});

const include = new HtmlWebpackIncludeAssetsPlugin({
    assets: [],
    append: false,
    hash: true
});

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
            test: /\.scss$/,
            use: extractSass.extract({
                use: [{
                    loader: 'css-loader',
                    options: {
                        sourceMap: true
                    }
                }, {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true
                    }
                }],
                // use style-loader in development
                fallback: 'style-loader'
            })
        }, {
            test: /\.(eot|woff(2)?)(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'file-loader',
            options: {
                name: '[name].[ext]'
            }
        }, {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url-loader',
            options: {
                limit: 10000,
                mimetype: 'image/svg+xml'
            }
        }, {
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url-loader',
            options: {
                limit: 10000,
                mimetype: 'application/octet-stream'
            }
        }, {
            test: /.(jpg|jpeg|png)$/,
            loader: 'file-loader',
            options: {
                name: '[name].[ext]'
            }
        }]
    },
    plugins: [
        stylelint,
        extractSass,
        html,
        include
    ],
    resolve: {
        extensions: ['.js', '.elm']
    }
};