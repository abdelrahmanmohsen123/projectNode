const express = require('express')

const router = new express.Router()

const auth = require('../middleware/auth')

const catController = require('../controller/cats.controller')

// Add categores 
router.post('/cat/addCats', auth.adminAuth, catController.addMainCat)

// Show all categores
router.get('/cat/displayCats', catController.displayAllMainCats)

// Show single cat
router.get('/cat/showCat/:id', catController.displySingleCat)

// Edit cats by id (edit category name)
router.patch('/cat/editCats/:id', catController.editMainNameCat)

// Delete single cat 
router.delete('/cat/deleteCat/:id', catController.delSingleCat)

module.exports = router