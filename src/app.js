const express = require('express')
require('../dbconnection/db')

const userRoutes = require('../routes/user.routes')

const menuRoutes = require('../routes/menu.routes')

const cartRoutes = require('../routes/cart.routes')


// New logic
const catRoutes = require('../routes/cats.routes')
const itemRoutes = require('../routes/item.routes')


const app = express()
app.use(express.json())

app.use(userRoutes)
app.use(menuRoutes)
app.use(cartRoutes)

// New logic
app.use(catRoutes)
app.use(itemRoutes)

module.exports = app