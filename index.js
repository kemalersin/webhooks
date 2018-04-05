require('dotenv').config()

const ips = [
  '127.0.0.1',
  '192.30.252.0/22',
  '185.199.108.0/22'
]

const express = require('express')
const mongoose = require('mongoose')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const bluebird = require('bluebird')

const ipfilter = require('express-ipfilter').IpFilter

const config = require('./config')
const routes = require('./routes')

const app = express()

mongoose.Promise = bluebird
mongoose.connect(config.mongo.url)

app.use(helmet())
app.use(ipfilter(ips, {mode: 'allow'}))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(morgan('tiny'))

app.use('/', routes)

app.listen(config.server.port, () => {
  console.log(`Magic happens on port ${config.server.port}`)
})

module.exports = app
