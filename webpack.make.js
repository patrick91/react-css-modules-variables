import path from 'path';
import webpack from 'webpack';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';


export default function makeConf(options) {
    let plugins;
    let cssLoaders = [{
        loader: 'css-loader',
        query: {
            modules: true,
            importLoaders: true,
            localIdentName: '[name]__[local]___[hash:base64:5]'
        }
    }, {
        loader: 'postcss-loader',
        options: {
            plugins: () => [
                require('postcss-reporter')({
                    clearMessages: true,
                }),
            ],
        },
    }];

    let entry = {
        index: './app/index',
    };

    if (options.development) {
        cssLoaders.unshift({
            loader: 'style-loader',
        });

        entry = {
            index: [
                'webpack-dev-server/client?http://0.0.0.0:5000',
                'webpack/hot/only-dev-server',
                './app/index',
            ],
        };

        plugins = [
            new HtmlWebpackPlugin({
                template: 'index.html',
                inject: true,
            }),
        ];
    } else {
        cssLoaders = ExtractTextPlugin.extract({
            fallbackLoader: 'style-loader',
            loader: cssLoaders,
        });

        plugins = [
            new webpack.optimize.UglifyJsPlugin(),
            new HtmlWebpackPlugin({
                template: 'index.html',
                minify: {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                    keepClosingSlash: true,
                    minifyJS: true,
                    minifyCSS: true,
                    minifyURLs: true,
                },
                inject: true,
            }),
            new ExtractTextPlugin({
                filename: 'css/main.css',
                allChunks: true,
            }),
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify('production'),
                },
            }),
        ];
    }

    return {
        entry,
        output: {
            path: path.join(__dirname, '/dist'),
            filename: 'bundle.js',
        },
        module: {
            rules: [
                { test: /\.css/, loader: cssLoaders },
                { test: /\.js$/, loader: 'babel-loader', exclude: path.join(__dirname, '/node_modules/') },
                { test: /\.jpe?g$|\.gif$|\.png$/i, loader: 'url-loader?limit=10000' },
            ],
        },
        resolve: {
            modules: [path.resolve(__dirname, 'app'), path.resolve('styles'), 'node_modules'],
            extensions: ['.js', '.jsx', '.json', '.css'],
        },
        plugins,
    };
}
