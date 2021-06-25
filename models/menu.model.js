const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const menuSchema = new mongoose.Schema({
    catName:{ type:String, required:true, maxlength:20, unique:true},
    meals:[{

        // meal:[{
        //     meal_id: {type: mongoose.Schema.Types.ObjectId},
        //     meal_name:{type:String, required:true, unique:true},
        //     meal_image:{type:String},
        //     description:{type:String},
        // }],


        
        meal_name:{type:String, required:true, unique:true},
        meal_image:{type:String},
        description:{type:String},


        size:[{
            name:{type:String, default:'meduim', enum:['large', 'meduim', 'small']},
            price:{type:Number, required:true},   
        }],
        offer_meal:[{
            newPrice:{type:Number},
            DateFrom:{type:Date},
            DateTo:{type:Date},
        }],
    }],
    additions:[{
        addition_name:{type:String},
        price:{type:Number},
    }],
    general_offers:[{
        offer_name:{type:String ,required:true},
        offer_description:{type:String},
        DateFrom:{type:Date},
        DateTo:{type:Date},
        price:{type:Number,required:true},  
        meal_image:{type:String},
    }]
    },
    { timestamps:true }
)




const Menu = mongoose.model('Menu', menuSchema)
module.exports = Menu
