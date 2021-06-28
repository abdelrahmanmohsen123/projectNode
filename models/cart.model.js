const mongoose = require('mongoose')


const cartSchema = new mongoose.Schema({
    item_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true,
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

cartSchema.virtual('order',{
    ref:'Order',
    localField:'_id',
    foreignField:'cart_id'
})
const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart