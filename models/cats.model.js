const mongoose = require('mongoose')
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
  
const Cats = mongoose.model('Cats', catSchema)

module.exports = Cats
