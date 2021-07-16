const express = require('express')

const router = new express.Router()

const auth = require('../middleware/auth')

const cartController = require('../controller/cart.controller')


// Add cart ///  athu ///
router.post('/addcarts',  cartController.addMainCart)

router.post('/addMaelToCart',  cartController.addMaelToCart)


// Show single cart
router.get('/showcart/:id', cartController.displySinglecart)

// Edit carts by id ///  athu ///
router.patch('/editcart/:id', cartController.editCart)

// Delete single cart 
router.delete('/deletecart/:id', cartController.delSingleCart)


module.exports = router