const mongoose = require('mongoose')


const cartSchema = new mongoose.Schema({
    item_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'Items' // ------ //
    },
    quant: {
        type: Number,
        default: 1
    }
    // cancel: {
    //     type: Boolean,
    //     default: false
    // }
}, {timestamps: true})


const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart