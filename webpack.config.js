/**
 * Created by miguhruiz on 17/12/16.
 */
const server = require('./webpack/webpack.server.config.js')
const client = require('./webpack/webpack.client.config')

module.exports = [
    server,
    client
]