const express = require('express')
// const userRoutes = require('../routes/user.routes')
require('../dbconnection/db')

const app = express()
app.use(express.json())




module.exports = app