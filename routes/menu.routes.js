const express = require('express')

const router = new express.Router()

const Menu = require('../models/menu.model')

const auth = require('../middleware/auth')

// Add categores 
router.post('/menu/addCats', async (req, res) => {
    try {
        let menu = new Menu(req.body)
        await menu.save()
        res.status(200).send({
            apiStatus: true,
            menu: {menu},
            message: `data inserted`
        })
    }
    catch(error) {
        res.status(500).send({
            apiStatus: false,
            menu: error,
            message: `Check data to insert`
        })
    }
})

// Show all categores
router.post('/menu/displayCats', async (req, res) => {
    try {
        let menu = await Menu.find()
        
        res.status(200).send({
            apiStatus: true,
            menu: {menu},
            message: `All cats`
        })
    }
    catch(error) {
        res.status(500).send({
            apiStatus: false,
            menu: error,
            message: `Not found data`
        })
    }
})

// Edit cats by id (edit category name)
router.patch('/menu/editCats/:id', async(req, res) => {
    
    try {
        id = req.params.id
        
        let data = await Menu.findById(id)
        
        let objkeys = Object.keys(req.body)
        

        let allowUpdate = ['catName']
        let validUpdate = objkeys.every(cat => allowUpdate.includes(cat))
        
        if(!validUpdate) res.status(500).send({
            apiStatus: false,
            message: `Not allowed update ${allowUpdate} only`
        })
        
        objkeys.forEach(cat => data[cat] = req.body[cat])
        
        await data.save()
        res.status(200).send({
            apiStatus: true,
            message: `Updated success ${allowUpdate}`
        })
    }
    catch(error) {
        res.status(500).send({
            apiStatus: false,
            message: `Check data to update`
        })
    }
})

// Add meal in cats testing
router.get('/menu/:id/addMeal', async(req, res) => {
    try {
        let id = req.params.id
        let data = req.body
        let category = await Menu.findById(id)
        
        category.meals = category.meals.concat({data})

        console.log(category.meals)

        await category.save()

        res.send(`save ${category}`)
        
    }

    catch(error) {
        res.send(error)
    }
    
})
//show single cat
router.get('/menu/showCat/:id',async(req,res)=>{
    try{
        let id = req.params.id
        let data = await Menu.findById(id)
        if(data==null) throw new Error ()
        res.status(200).send({
            apiStatus: true,
            data: data,
            message: `done`
    })
    }
    catch(e){
        res.status(500).send({
            apiStatus: false,
            message: `not found`
        })
    }
    
})
//delete single cat 
router.delete('/menu/deleteCat/:id',async(req,res)=>{

    try{
        let id = req.params.id
        let data = await Menu.findById(id)
        if(data==null) throw new Error ()
        await data.remove()
        res.status(200).send({
            apiStatus: true,
            message: `deleted successful`
    })
    }
    catch(e){
        res.status(500).send({
            apiStatus: false,
            message: `not found`
        })
    }

})

module.exports = router
