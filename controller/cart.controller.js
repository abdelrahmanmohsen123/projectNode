// To used model file
const Items = require('../models/item.model')

const Cart = require('../models/cart.model')

// Add main Cart 
const addMainCart = async (req, res) => {
    let userId = req.body.user_id

    let itemId = req.body.products.item_id

    let items = await Items.findById(itemId)

    let quantityOfItem = Number.parseInt(req.body.products.quantity)

    let itemSize = items.size


    let priceItem = null

    itemSize.forEach(s => {
        priceItem = Number.parseInt(s.price)
    })

    let totalPriceItem = priceItem * quantityOfItem

    let id = '60f0f676ea5a2f3e9428ac39'
    try {

        let cart = await Cart.findById(id)
        let indexedItem = cart.products.findIndex(i => i.item_id == itemId)
        console.log(indexedItem)
        if(cart) {
            let indexedItem = cart.products.findIndex(i => i.item_id == itemId)

            if(indexedItem > -1) {
                let productItem = cart.products[indexedItem]
                productItem.quantity = quantityOfItem
                cart.products[indexedItem] = productItem
            } else {
                cart.products.push({
                    item_id: itemId,
                    quantity: quantityOfItem,
                    price: priceItem,
                    total: totalPriceItem
                }) 
            }
            console.log(cart, userId)
            await cart.save()
            return res.status(200).send({
                apiStatus: true,
                success: cart,
                message: `item inserted`
            })
            
        } else {
            // console.log(cart, userId)

            // let newCart = await new Cart
            newCart = 
                {
                    user_id: userId,
                    products: [{
                        item_id: itemId,
                        quantity: quantityOfItem,
                        price: priceItem,
                        total: totalPriceItem
                    }]
    
                }
                ayhaga = await Cart.create(newCart)
            
            console.log(typeof({userId}) ,priceItem, totalPriceItem)
            await ayhaga.save()
            return res.status(201).send(ayhaga)
        }

         
        // console.log(cart)
        
    }
    catch(error) {
        res.status(500).send({
            apiStatus: false,
            result: error.message,
            message: `Check data to insert`
        })
    }
}

 const addMaelToCart = async function (req, res)  {

    
     // let items = Items.findById(Items['_id'])
    // console.log(items)
    try {
        let cart_id=req.body.cart_id
        let cart = await Cart.findById(cart_id)
        
       
   // let item ={item_id:req.body.cart.item_id,quantity:req.body.cart.quantity}
        
        console.log(cart.cart)

        await cart.cart.push({item_id:req.body.cart.item_id,quantity:req.body.cart.quantity})

        // if(cart.length!=0){
        //    await cart.push(req.body)
        // }

       console.log(cart)
        await cart.save()
        res.status(200).send({
            apiStatus: true,
            cart: cart,
            message: `item inserted to card`
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
        console.log(data)
        let objkeys = Object.keys(req.body)
        if(objkeys.length == 0)  throw new Error ()
        let allowUpdate = ['cart']
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
    delSingleCart,
     addMaelToCart
}