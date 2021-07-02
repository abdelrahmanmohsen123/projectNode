const express = require('express')

const router = new express.Router()

const auth = require('../middleware/auth')

const itemController = require('../controller/item.controller')


// Add items 
router.post('/addItem', itemController.uploadItemImg().single('itemImage') ,itemController.addItem)

// Show all items
 router.get('/showAllItems', itemController.showAllItems)

 //Show single item
router.get('/showItem/:id', itemController.showSingleItem)

// Edit items by id (edit item)
router.patch('/editItem/:id', auth.adminAuth, itemController.editItem)

// Delete single item
router.delete('/deleteItem/:id', auth.adminAuth, itemController.delSingleItem)
module.exports = router