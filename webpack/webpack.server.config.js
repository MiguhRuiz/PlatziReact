/**
 * Created by miguhruiz on 17/12/16.
 */

const fs = require('fs')
const webpack = require('webpack')
const extractTextPlugin = require('extract-text-webpack-plugin')

const nodeModules = fs
    .readdirSync('node_modules')
    .filter(x => ['.bin'].indexOf(x) === 1)
    .reduce(
        (modules, module) => Object.assign(modules, { [module]: `commonjs ${module}`}),
        {}
    )

const config = {
    entry: './source/server.js',
    output: {
        filename: 'index.js',
        path: './built/server',
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
                        'latest-minimal',
                        'react'
                    ],
                    env: {
                        production: {
                            plugins: ['transform-regenerator', 'transform-runtime'],
                            presets: ['es2015']
                        },
                        development: {
                            presets: ['latest-minimal']
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
    target: 'node',
    externals: nodeModules,
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