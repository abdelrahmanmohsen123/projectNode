const express = require('express')
require('../dbconnection/db')

const userRoutes = require('../routes/user.routes')

const menuRoutes = require('../routes/menu.routes')


const app = express()
app.use(express.json())

app.use(userRoutes)
app.use(menuRoutes)


module.exports = app