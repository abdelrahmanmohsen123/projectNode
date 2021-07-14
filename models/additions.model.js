// const mongoose = require('mongoose')
// const validator = require('validator')
// const Cats = require('../models/cats.model')

// const additionSchema = new mongoose.Schema({
//     // cat_id: {
//     //     type: mongoose.Schema.Types.ObjectId,
//     //     required: true,
//     //     ref:'Cats'
//     // },
//     name: { 
//         type: String, 
//         required: [true, 'Please write item name'],
//         trim: true, 
//         maxlength: 40,
//         minlength: 3,
//         unique: [true, 'The name of this item was established']
//     },
//     itemImage:{type: String , trim: true},
//     size:[
//         {
//             sizeType:{
//                 type: String,
//                 enum:['large', 'meduim', 'small', 'none'],
//                 trim: true,
//                 default: 'none'
//             },
//             price:{type:Number, required:true, trim: true},   
//         }
//     ],
//     DateFrom:{type:Date},
//     DateTo:{type:Date},
    
//     offer_item:[
//         {
//             // is_offer:{type:Boolean,default:false},
//             newPrice:{type:Number, trim: true},
//             desc:{type:String, trim: true}
            
//         }
//     ],

// }, { timestamps:true })


// itemSchema.virtual('cartItem',{
//     ref:'Cart',
//     localField:'_id',
//     foreignField:'cart.item_id'
// })



// const Items = mongoose.model('Items', itemSchema)
// module.exports = Items















// // items: {
// //     cat_id: {
// //         forenkey
// //     },
// //     itemName,
// //     itemdescripr,
// // itemImage
// //     timefrom,
// //     timeto,
// //     size : [{
// //         name
// //         price

// //     }],
// //     offer:

    
// // }