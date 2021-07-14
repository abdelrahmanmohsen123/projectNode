const mongoose = require('mongoose')
const validator = require('validator')
const Cats = require('../models/cats.model')

const itemSchema = new mongoose.Schema({
    cat_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'Cats'
    },
    name: { 
        type: String, 
        required: [true, 'Please write item name'],
        trim: true, 
        maxlength: 40,
        minlength: 3,
        unique: [true, 'The name of this item was established']
    },
    description:{type: String, trim: true},
    itemImage:{type: String , trim: true},
    size:[
        {
            sizeType:{
                type: String,
                enum:['large', 'meduim', 'small', 'none'],
                trim: true,
                default: 'none'
            },
            price:{type:Number, required:true, trim: true},   
        }
    ],
    dateRange: {
        type: [String, 'Please insert valid date'],
        trim: true, 
        required: [true, 'The date of this item was established']    
    },
    offer_item:[
        {
            // is_offer:{type:Boolean,default:false},
            newPrice:{type:Number, trim: true},
            desc:{type:String, trim: true},
            dateRange: {
                type: [String, 'Please insert valid date'],
                trim: true, 
                required: [true, 'The date of this item was established']    
            },
        }
    ],

}, { timestamps:true })


itemSchema.virtual('cartItem',{
    ref:'Cart',
    localField:'_id',
    foreignField:'cart.item_id'
})

const Items = mongoose.model('Items', itemSchema)
module.exports = Items















// items: {
//     cat_id: {
//         forenkey
//     },
//     itemName,
//     itemdescripr,
// itemImage
//     timefrom,
//     timeto,
//     size : [{
//         name
//         price

//     }],
//     offer:

    
// }