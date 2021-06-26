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
router.post('/menu/:id/addMeal', async(req, res) => {
    try {
        let id = req.params.id
        let data = req.body
        let category = await Menu.findById(id)
        
         await category.meals.push(data)
        await category.save()
        res.status(200).send({
            apiStatus: true,
            message: `done`
    })
    }
    catch(e){
        res.status(500).send({
            apiStatus: false,
            result: e.message,
            message: `not found`
        })
    }
    
})
//add adddition
router.post('/menu/:id/add_addition', async(req,res)=>{
    try{
        let id = req.params.id
        let data = req.body
        //console.log(typeof data)
        let category = await Menu.findById(id)
        await category.additions.push(data) 
        await category.save()
        res.status(200).send({
            apiStatus: true,
            message: `done`
    })
    }
    catch(e){
        res.status(500).send({
            apiStatus: false,
            result: e.message,
            message: `not found`
        })
    }
})
//add general_offers
router.post('/menu/:id/addgeneral_offers', async(req,res)=>{
    try{
        let id = req.params.id
        let data = req.body
        let category = await Menu.findById(id)
        await category.general_offers.push(data) 
        await category.save()
        res.status(200).send({
            apiStatus: true,
            message: `done`
    })
    }
    catch(e){
        res.status(500).send({
            apiStatus: false,
            result: e.message,
            message: `not found`
        })
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
// show single meal
router.get('/menu/cat/:id/showSingleMeal/:meal_id',async(req,res)=>{
    try{
        let id = req.params.id
        let meal_id = req.params.meal_id
        let cat = await Menu.findById(id)
        if(cat==null) throw new Error ()
        //let data = await cat.meals.findById(meal_id)
        let catMeal = cat.meals.find(meal=> meal_id==meal._id)
        //res.send(catMeal)
        //console.log(catMeal)
        if(catMeal==null) res.send('meal not found')
        res.status(200).send({
            apiStatus: true,
            data: catMeal,
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

// delete single meal
router.delete('/menu/cat/:id/deleteSingleMeal/:meal_id',async(req,res)=>{
    try{
        let id = req.params.id
        let meal_id = req.params.meal_id
        let cat = await Menu.findById(id)
        if(cat==null) throw new Error ()
        //let data = await cat.meals.findById(meal_id)
        let catMeal = cat.meals.find(meal=> meal_id==meal._id)
        //res.send(catMeal)
        //console.log(catMeal)
        await catMeal.remove()
        await  cat.save()
        //console.log(cat)
        if(catMeal==null) res.send('meal not found')
        res.status(200).send({
            apiStatus: true,
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
// show addition
router.get('/menu/cat/:id/showaddition/:addition_id',async(req,res)=>{
    try{
        let id = req.params.id
        let addition_id = req.params.addition_id
        let cat = await Menu.findById(id)
        if(cat==null) throw new Error ()
        //let data = await cat.meals.findById(meal_id)
        let cataddition = cat.additions.find(addition=>{
            return addition_id==addition._id
        })
        //res.send(catMeal)
        //console.log(catMeal)
        if(cataddition==null) res.send('addition not found')
        res.status(200).send({
            apiStatus: true,
            data: cataddition,
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

// delete addition
router.delete('/menu/cat/:id/deleteaddition/:addition_id',async(req,res)=>{
    try{
        let id = req.params.id
        let addition_id = req.params.addition_id
        let cat = await Menu.findById(id)
        if(cat==null) throw new Error ()
        //let data = await cat.meals.findById(meal_id)
        let cataddition = cat.additions.find(addition=>{
            return addition_id==addition._id
        })
        //res.send(catMeal)
        //console.log(catMeal)
        await cataddition.remove()
        await cat.save()
        //console.log(cat)
        if(cataddition==null) res.send('addition not found')
        res.status(200).send({
            apiStatus: true,
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
// show general_offers
router.get('/menu/cat/:id/showgeneral_offers/:general_offers_id',async(req,res)=>{
    try{
        let id = req.params.id
        let general_offers_id = req.params.general_offers_id
        let cat = await Menu.findById(id)
        if(cat==null) throw new Error ()
        //let data = await cat.meals.findById(meal_id)
        let catgeneral_offers = cat.general_offers.find(general_offers=>{
            return general_offers_id==general_offers._id
        })
        //res.send(catMeal)
        //console.log(catMeal)
        if(catgeneral_offers==null) res.send('general_offers not found')
        res.status(200).send({
            apiStatus: true,
            data: catgeneral_offers,
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

// delete general_offers
router.delete('/menu/cat/:id/deletegeneral_offers/:general_offers_id',async(req,res)=>{
    try{
        let id = req.params.id
        let general_offers_id = req.params.general_offers_id
        let cat = await Menu.findById(id)
        if(cat==null) throw new Error ()
        //let data = await cat.meals.findById(meal_id)
        let catgeneral_offers = cat.general_offers.find(general_offers=>{
            return general_offers_id==general_offers._id
        })
        //res.send(catMeal)
        //console.log(catMeal)
        await catgeneral_offers.remove()
        await cat.save()
        //console.log(cat)
        if(catgeneral_offers==null) res.send('general_offers not found')
        res.status(200).send({
            apiStatus: true,
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
module.exports = router
