const express = require('express')

const router = new express.Router()

const Cart = require('../models/cart.model')

const Menu = require('../models/menu.model')


const auth = require('../middleware/auth')
// const { findById } = require('../models/cart.model')


router.post('/cart/:cat_id/add', async(req,res) => {
    try{
        let id = req.params.cat_id
        let data = new Cart({
            ...req.body,
            'cat_id': id
        })
        await data.save()
        res.send(data)
    }
    catch(e){
        res.send(e.message)
    }
})

router.post('/cart/show/:id', async(req,res) => {
    try{
        let id = req.params.id
        let cart = await Cart.findById(id)
        let catCart = await Menu.findById(cart.cat_id)


        let catMeal = await catCart.meals.find(meal => cart.meal_id == meal._id)


        console.log(catMeal)
        // let data = new Cart({
        //     ...req.body,
        //     'cat_id': id
        // })
        // await data.save()
        res.send(catMeal)
    }
    catch(e){
        res.send(e.message)
    }
})


module.exports = router
