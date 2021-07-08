const express = require('express')

const router = new express.Router()

const auth = require('../middleware/auth')

const itemController = require('../controller/item.controller')


// Add items 
router.post('/cat/addItem', itemController.uploadItemImg().single('itemImage'), itemController.addItem)

// Show all items
router.get('/cat/showAllItems', itemController.showAllItems)

// Show single item
router.get('/cat/showItem/:id', itemController.showSingleItem)

// Edit items by id (edit item)
router.patch('/cat/editItem/:id', itemController.editItem)

// Delete single item
router.delete('/cat/deleteItem/:id', auth.adminAuth, itemController.delSingleItem)
module.exports = router