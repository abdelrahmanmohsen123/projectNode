const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const catSchema = new mongoose.Schema({
    catName: { 
        type: String, 
        required: [true, 'Please write category name'], 
        maxlength: 20,
        minlength: 3,
        unique: [true, 'The name of this category was established']
    }
}, { timestamps:true })

const Cats = mongoose.model('Cats', catSchema)
module.exports = Cats
