const express = require('express')

const router = new express.Router()

const auth = require('../middleware/auth')

const orderController = require('../controller/order.controller')


// Add order
router.post('/addorder', orderController.addOrder)

// Edit order
router.patch('/edit/:id',auth.adminAuth ,orderController.editOrder)

// cancel order
router.get('/cancelOrder/:id',auth.userAuth ,orderController.cancelOrder)

module.exports = router