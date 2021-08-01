// To used model file
const Items = require('../models/item.model')

const Cart = require('../models/cart.model')

// Add main Cart 
const addMainCart = async (req, res) => {
    try {

        let user_id = req.body.user_id

        let item_id = req.body.products.item_id

        let sizeType = req.body.products.sizeType

        let items = await Items.findById(item_id)

        let quantity = Number.parseInt(req.body.products.quantity)

        let itemSize = items.size

        let price = null

        itemSize.forEach(s => {
            if (s.sizeType == sizeType) {
                price = Number.parseInt(s.price)
            }
        })

        let total = price * quantity

        let subTotalFun = (cart) => {
            let totalPrice = cart.products.reduce((subTotal, sub) => subTotal + sub.total, 0)
            cart.subTotal = totalPrice
        }

        if (user_id) {
            let cart = await Cart.findOne({ user_id })

            if (cart) {
                subTotalFun(cart)
                let indexedItem = cart.products.findIndex(i => i.item_id == item_id)
                if (indexedItem > -1) {
                    let indexed = cart.products.findIndex(i => ((i.sizeType == sizeType) && (i.item_id == item_id)))
                    if (indexed > -1) {
                        let proSize = cart.products[indexed]
                        proSize.quantity = quantity
                        proSize.total = total
                        cart.products[indexed] = proSize
                        subTotalFun(cart)
                    } else {
                        cart.products.push({ item_id, sizeType, quantity, price, total })
                        subTotalFun(cart)
                    }
                }
                else {
                    cart.products.push({ item_id, sizeType, quantity, price, total })
                    subTotalFun(cart)
                }

                await cart.save()

                res.status(200).send({
                    apiStatus: true,
                    success: cart,
                    message: `item inserted cart`
                })

            } else {
                // no cart for user, create new cart
                subTotal = total
                let newCart = await Cart.create({
                    user_id,
                    products: [{ item_id, sizeType, quantity, price, total }],
                    subTotal,
                })
                res.status(201).send(newCart)
            }
        } else {
            res.send(req.body)
            console.log(price, total)
        }
    }
    catch (error) {
        res.status(500).send({
            apiStatus: false,
            result: error.message,
            message: `Check data to insert cart`
        })
    }
}

const addMaelToCart = async function (req, res) {


    // let items = Items.findById(Items['_id'])
    // console.log(items)
    try {
        let cart_id = req.body.cart_id
        let cart = await Cart.findById(cart_id)


        // let item ={item_id:req.body.cart.item_id,quantity:req.body.cart.quantity}

        console.log(cart.cart)

        await cart.cart.push({ item_id: req.body.cart.item_id, quantity: req.body.cart.quantity })

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
    catch (error) {
        res.status(500).send({
            apiStatus: false,
            result: error.message,
            message: `Check data to insert`
        })
    }
}

// Edit name of main Cart
const editCart = async (req, res) => {
    try {
        id = req.params.id
        let data = await Cart.findById(id)
        console.log(data)
        let objkeys = Object.keys(req.body)
        if (objkeys.length == 0) throw new Error()
        let allowUpdate = ['cart']
        let validUpdate = objkeys.every(cart => allowUpdate.includes(cart))

        if (!validUpdate) res.status(500).send({
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
    catch (error) {
        res.status(500).send({
            apiStatus: false,
            message: `Check data to update`
        })
    }
}

// Show single main cart
const displySinglecart = async (req, res) => {
    try {

        let id = req.params.id
        let data = await Cart.findById(id)

        if (!data) throw new Error(`Data not founded of Cart`)

        res.status(200).send({
            apiStatus: true,
            CartSingle: { data },
            message: `Single Cart`
        })
    }
    catch (error) {
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

        if (!data) throw new Error(`Data not founded of Cart `)

        await data.remove()

        res.status(200).send({
            apiStatus: true,
            message: `Deleted done`
        })
    }

    catch (error) {
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