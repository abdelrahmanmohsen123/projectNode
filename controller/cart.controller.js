// To used model file
const Items = require('../models/item.model')

const Cart = require('../models/cart.model')

// Add main Cart 
const addMainCart = async function (req, res)  {

    
    let items = Items.findById(Items['_id'])
    console.log(items)
    try {
        let cart = await new Cart({
            ...req.body,
            // 'cat_id':req.cats._id,
        })
       
        await cart.save()
        res.status(200).send({
            apiStatus: true,
            cart: {cart},
            message: `item inserted`
        })
    }
    catch(error) {
        res.status(500).send({
            apiStatus: false,
            result: error.message,
            message: `Check data to insert`
        })
    }
}

// Edit name of main Cart
const editCart = async(req, res) => {
    try {
        id = req.params.id
        let data = await Cart.findById(id)
        let objkeys = Object.keys(req.body)
        if(objkeys.length == 0)  throw new Error ()
        let allowUpdate = ['quant']
        let validUpdate = objkeys.every(cart => allowUpdate.includes(cart))
        
        if(!validUpdate) res.status(500).send({
            apiStatus: false,
            message: `Not allowed update ${allowUpdate} only`
        })
        objkeys.forEach(cart => data[cart] = req.body[cart])
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
}

// Show single main cart
const displySinglecart = async (req,res) => {
    try {

        let id = req.params.id
        let data = await Cart.findById(id)

        if(!data) throw new Error (`Data not founded of Cart`)

        res.status(200).send({
            apiStatus: true,
            CartSingle: {data},
            message: `Single Cart`
        })
    }
    catch(error){
        res.status(500).send({
            apiStatus: false,
            result: error.message,
            message: `Check data`
        })
    }
    
}

// Delete single cart
const delSingleCart = async (req, res) => {

    try {
        
        let id = req.params.id
        let data = await Cart.findById(id)

        if(!data) throw new Error (`Data not founded of Cart `)
        
        await data.remove()

        res.status(200).send({
            apiStatus: true,
            message: `Deleted done`
        })
    }

    catch(error){
        res.status(500).send({
            apiStatus: false,
            result: error.message,
            message: `Check data`
        })
    }
}


// To exports function controller
module.exports = {
    // Main Cart
    addMainCart,
    displySinglecart,
    editCart,
    delSingleCart
}