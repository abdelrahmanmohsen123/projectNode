const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
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
        maxlength: 40,
        minlength: 3,
        unique: [true, 'The name of this item was established']
    },
    description:{type: String},
    itemImage:{type: String},
    size:[
        {
            name:{
                type:String,
                enum:['large', 'meduim', 'small', 'none'], 
                default: 'none'
            },
            price:{type:Number, required:true},   
        }
    ],
    DateFrom:{type:Date},
    DateTo:{type:Date},
    price:{type:Number},
    offer_item:[
        {
            is_offer:{type:Boolean,default:false},
            newPrice:{type:Number},
            desc:{type:String}
            
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