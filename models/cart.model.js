const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        trim: true,
        ref: 'User'
    },
    
    products: [
        {
            item_id: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref:'Items', // ------ //
            },
            quantity: {
                type: Number,
                default: 1,
                min: [1, 'Quantity can not be less then 1.']
            },
            sizeType: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            total: {
                type: Number,
                required: true
            },
            
            // Offers ????
            offers: [
                {
                    newPrice: {
                        type: Number, 
                        required: true
                    },

                    desc: {
                        type: String,
                        required: true 
                    }
                    
                },
            ]

        }

    ],

    subTotal: {
        type: Number,
        default: 0
    }
            
}, {timestamps: true})

cartSchema.virtual('ordercart',{
    ref:'Order',
    localField:'_id',
    foreignField:'cart_id'
})

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart