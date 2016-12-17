/**
 * Created by miguhruiz on 17/12/16.
 */

const extractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    entry: './source/server.js',
    output: {
        filename: 'index.js',
        path: './built/server'
    },
    module: {
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
                    ]
                }
            },
            {
                test: /\.css$/,
                loader: extractTextPlugin.extract('style', 'css?modules')
            }
        ]
    },
    target: 'node',
    plugins: [
        new extractTextPlugin('../statics/styles.css')
    ]
}