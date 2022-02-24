const express = require('express')
const jediRouter = require('./jedis/jedis-router')

const server = express();

server.use(express.json());

server.use('/api/jedis', jediRouter);

server.use('*', (req, res) => {
    res.status(404).json({
        message: 'not found'
    })
})



module.exports = server;