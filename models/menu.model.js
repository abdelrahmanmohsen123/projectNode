const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const Cart = require('../models/cart.model')

const menuSchema = new mongoose.Schema({
    catName: { 
        type: String, 
        required: [true, 'Please write category name'], 
        maxlength: 20,
        minlength: 3,
        unique: [true, 'The name of this category was established']
    },
    meals:[
        {
            meal_name:{
                type: String, 
                required: [true, 'Enter any name for this meal'], 
                unique: [true, 'The name of this meal was established']
            },
            meal_image:{type: String},
            description:{type: String},
            size:[
                {
                    name:{
                        type:String, 
                        default:'meduim', 
                        enum:['large', 'meduim', 'small']
                    },
                    price:{type:Number, required:true},   
                }
            ],
            offer_meal:[
                {
                    newPrice:{type:Number},
                    DateFrom:{type:Date},
                    DateTo:{type:Date},
                }
            ],
        }
    ],
    additions:[
        {
            addition_name:{
                type: String, 
                unique: [true, 'The name of this addition was established']
            },
            price:{type:Number},
        }
    ],
    general_offers:[
        {
            offer_name:{
                type:String, 
                required: [true, 'Enter offer name'], 
                unique: [true, 'The name of this offer was established']
            },
            offer_description:{type:String},
            DateFrom:{type:Date},
            DateTo:{type:Date},
            price:{type:Number, required:true},  
            meal_image:{type:String},
        }
    ]
},
    { timestamps:true }
)



menuSchema.virtual('catsCart',{
    ref:'Cart',
    localField:'_id',
    // foreignField:'user_id', // or auth
    foreignField:'cat_id',
    foreignField:'meal_id', // or cat_id
    foreignField:'offer_id',
    foreignField:'addition_id' 
    
})




const Menu = mongoose.model('Menu', menuSchema)
module.exports = Menu
