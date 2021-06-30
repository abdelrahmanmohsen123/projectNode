const express = require('express')
require('../dbconnection/db')

const userRoutes = require('../routes/user.routes')

const menuRoutes = require('../routes/menu.routes')

const cors = require('cors')

 

// New logic
const catRoutes = require('../routes/cats.routes')
const itemRoutes = require('../routes/item.routes')
const cartRoutes = require('../routes/cart.routes')
const orderRoutes = require('../routes/order.routers')


const app = express()
app.use(express.json())

app.use(cors())

app.use(userRoutes)
app.use(menuRoutes)

// New logic

app.use(catRoutes)
app.use(itemRoutes)
app.use(cartRoutes)
app.use(orderRoutes)

module.exports = app