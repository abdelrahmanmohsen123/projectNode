
const mongoose = require('mongoose')
const Cart = require('../models/cart.model')

const orderSchema = new mongoose.Schema({
    cart_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique:true,
        ref:'Cart' // ------ //
    }, // user_id
    
    tax: {
        type: Number, // or cart
        trim: true
    },

    address: {
        type: String, // import user data [phone, email]
        required: true,
        trim: true
    },

    payment_method: {
        type: String, 
        enum: ['cash','visa']
    },

    receving_method: {
        type: String, 
        enum:['receipt_form_shop',' delivery']
    },
    message: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: ['pending', 'accept', 'finish', 'refuse by resturan', 'refuse by system'],
        default: 'pending'
    },
    time_order: {
        type: String,
        default: 'half an hour'
    },
    cancel: {
        type: Boolean, 
        default: false
    }
}, {timestamps: true})


const Order = mongoose.model('Order', orderSchema)

module.exports = Order