// To used model file
const Order = require('../models/order.model')
const Cart = require('../models/cart.model')
const Item = require('../models/item.model')
// Add order 
const addOrder = async (req, res) => {
    
    try {
        // let order = await new Order({
        //     ...req.body,
        //     // 'cat_id':req.cats._id,
        // })
        order = await new Order()
        await req.order.populate({
            path:'ordercart'
        }).execPopulate()
        console.log(req.order)
        // cartId= req.body.cart_id
        // let cart = await Cart.findById(cartId)
        // console.log(cart.item_id)
        // let item = await Item.findById(cart[0].item_id)
        // console.log(item)
        // console.log(cart)
        // await order.save()
        res.status(200).send({
            apiStatus: true,
            order: {order},
            message: `order inserted`
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

// Edit order
const editOrder = async(req, res) => {
    try {
        id = req.params.id
        let data = await Order.findById(id)
        let objkeys = Object.keys(req.body)
        if(objkeys.length == 0)  throw new Error ()
        let allowUpdate = ['status','time_order','tax']
        let validUpdate = objkeys.every(order => allowUpdate.includes(order))
        
        if(!validUpdate) res.status(500).send({
            apiStatus: false,
            message: `Not allowed update ${allowUpdate} only`
        })
        objkeys.forEach(order => data[order] = req.body[order])
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

// cancel order
const cancelOrder = async(req,res)=>{
    try{
        let id = req.params.id
        let myorder =  await Order.findById(id)
        myorder.cancel=true
        await myorder.save()
        res.status(200).send({
            status: true,
            message: 'order cancel'
        })
    } catch (error) {
        res.status(500).send({
            status: false,
            error: error.message
        })
    }
}


// Show order ?

// To exports function controller
module.exports = {
   
    addOrder,
    editOrder,
    cancelOrder
}