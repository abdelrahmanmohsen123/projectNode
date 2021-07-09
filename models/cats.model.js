const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Items = require('../models/item.model')
const catSchema = new mongoose.Schema({
    catName: { 
        type: String, 
        required: [true, 'Please write category name'], 
        maxlength: 20,
        minlength: 3,
        trim: true,
        unique: [true, 'The name of this category was established']
    }
}, { timestamps:true })

catSchema.virtual('catItem',{
    ref:'Items',
    localField:'_id',
    foreignField:'cat_id'
})


// catSchema.pre('findByIdAndDelete', async function (req, res, next){
//     try {
//         let cats = this
//         await Items.deleteMany({cat_id:cats._id})
//         next()
//         res.status(200).send({
//             apiStatus: true,
//             message: `Deleted done`
//         })
//     }
//     catch(error){
//         res.status(500).send({
//             apiStatus: false,
//             result: error.message,
//             message: `Deleted done`
//         })
        
//     }
// })
// UserSchema.pre('deleteOne', { document: false, query: true }, async function() {
//     const doc = await this.model.findOne(this.getFilter());
//     await UserLink.deleteMany({ user: doc._id });
//   });
// catSchema.pre('findByIdAndDelete', { document: false, query: true }, async function() {
//     const cats = await this.model.findOne(this.getFilter());
//     await Items.deleteMany({cat_id: cats._id });
//   });
  
const Cats = mongoose.model('Cats', catSchema)

module.exports = Cats
