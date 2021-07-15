const mongoose = require('mongoose')


const cartSchema = new mongoose.Schema({
    cart:[
        {
            item_id: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                unique: true,
                ref:'Items' // ------ //
            },
            
            quantity: {
                type: Number,
                default: 1,
                min: [1, 'Quantity can not be less then 1.']
            }
        }
    ]
}, {timestamps: true})

cartSchema.virtual('ordercart',{
    ref:'Order',
    localField:'_id',
    foreignField:'cart_id'
})
const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart