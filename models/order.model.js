
const mongoose = require('mongoose')
const Cart = require('../models/cart.model')

const orderSchema = new mongoose.Schema({
    cart_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique:true,
        ref:'Cart' // ------ //
    }, // user_id
    total_price:{ 
        type:Number // cart
    },
    tax:{
        type:Number // 
    },
    address :{
        type: String
    },
    payment_method:{
        type :String, enum:['cash','visa']
    },
    receving_method:{
        type : String, enum:['receipt_form_shop',' delivery']
    } ,
    message:{
        type : String
    },
    status:{
        type: String,
        enum: ['pending', 'accept', 'finish', 'refuse by resturan', 'refuse by system'],
        default: 'pending'
    },
    time_order:{
        type:String,
        default : 'half an hour'
    },
    cancel :{
        type:Boolean , default: false
    }
}, {timestamps: true})


const Order = mongoose.model('Order', orderSchema)

module.exports = Order