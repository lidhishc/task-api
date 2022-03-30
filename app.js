const express = require('express')
const app = express()
var cors = require('cors')
const helmet = require('helmet')
const routerEndpoints = require('./routes')
const db = require('./models')

app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(routerEndpoints)
db.sequelize.sync()

module.exports = app
