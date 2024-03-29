/**
 * Created by miguhruiz on 17/12/16.
 */
const webpack = require('webpack')
const extractTextPlugin = require('extract-text-webpack-plugin')

const config = {
    entry: './source/client.js',
    output: {
        filename: 'app.js',
        path: './built/statics',
        publicPath: process.env.NODE_ENV === 'production'
            ? 'https://platzi-react-redux-sfs.now.sh'
            : 'https://localhost:3001/'
    },
    module: {
        preloaders: [
            {
                test: /\.jsx?/,
                loader: 'eslint'
            }
        ],
        loaders: [
            {
                test: /\.json$/,
                loader: 'json'
            },
            {
                test: /\.jsx?$/,
                loader: 'babel',
                exclude: /(node_modules)/,
                query: {
                    presets: [
                        'es2016',
                        'es2017',
                        'react'
                    ],
                    plugins: [
                        'transform-es2015-modules-commonjs'
                    ],
                    env: {
                        production: {
                            plugins: ['transform-regenerator', 'transform-runtime'],
                            presets: ['es2015']
                        },
                        development: {
                            plugins: ['transform-es2015-modules-commonjs']
                        }
                    }
                }
            },
            {
                test: /\.css$/,
                loader: extractTextPlugin.extract('style', 'css?modules')
            }
        ]
    },
    target: 'web',
    resolve: {
        extensions: ['', '.js', '.jsx', '.css', '.json']
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
            }
        }),
        new webpack.optimize.OccurrenceOrderPlugin(true),
        new extractTextPlugin('../statics/styles.css')
    ]
}

if(process.env.NODE_ENV === 'production') {
    config.plugins.push(
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            mangle: {
                except: ['$super', '$', 'export', 'require']
            }
        })
    )
}

module.exports = config