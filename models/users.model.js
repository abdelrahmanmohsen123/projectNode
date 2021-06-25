const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    id:{type:Number},
    fname:{ type:String, required:true, maxlength:20 },
    lname:{ type:String, required:true, maxlength:20 },
    password:{ type:String, trim:true, required:true },
    email:{
        type:String,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)) throw new Error('invalid email')
        }
    },
    accountStatus:{ type:Boolean, default:false },
    activateCode:{type:String},
    address:{type:String},
    userType:{type:String, required:true,enum:['admin','user']},
    userImage:{ type: String },
    phone:{ type:String ,required:true,unique:true},
    tokens: [
        { token:{type:String}}
    ]
    },
    { timestamps:true }
)

const User = mongoose.model('User', userSchema)
module.exports = User
