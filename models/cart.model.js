const mongoose = require('mongoose')


const cartSchema = new mongoose.Schema({
    cat_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'Menu'
    },
    meal_id: { 
        type: mongoose.Schema.Types.ObjectId,
        
        ref:'Menu'
    },
    offer_id: { 
        type: mongoose.Schema.Types.ObjectId,
        
        ref:'Menu'
    },
    addition_id: { 
        type: mongoose.Schema.Types.ObjectId,
        
        ref:'Menu'
    }, 
    quant: {
        type: Number,
        
        default: 1
    },
    cancel: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})


const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart