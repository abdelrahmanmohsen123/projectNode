const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    fname: { type: String, required: true, maxlength: 20, minlength: 3, trim: true },
    lname: { type: String, required: true, maxlength: 20, minlength: 3, trim: true },
    password: { type: String, trim: true, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) throw new Error('invalid email')
        }
    },
    accountStatus: { type: Boolean, default: false },
    activateCode: { type: String },
    address: { type: String, trim: true },
    userType: { type: String, enum: ['admin', 'user'], default: 'user', trim: true },
    phone: { 
        type: String , 
        required: [true, `Phone has token`],  
        unique: true,
        trim: true,
        validate(value) {
            if (!validator.isMobilePhone(value,'ar-EG' )) throw new Error('invalid phone')
        }
    },
    userImage: { type: String, trim: true },
    
    tokens: [
        { token: { type: String } }
    ]
}, { timestamps: true }
)

userSchema.virtual('cartUser', {
    ref:'Cart',
    localField: '_id',
    foreignField: 'user_id'
})
//not show password
userSchema.methods.toJSON = function() {
    let user = this.toObject() // *****
    itemsHidden = ['passsword']
    itemsHidden.forEach(item => {
        delete user[item]
    })
    return user
}

// Hashing password
userSchema.pre('save', async function() {
    // ry {
        user = this

        if (!this.__v) {
            lastUser = await User.findOne().sort({ _id: -1 })
            if (!lastUser) user.id = 1
            else user.id = lastUser.id + 1
        }

        if (user.isModified('password')) {
            user.password = await bcrypt.hash(user.password, 8)
        }
        // return user
    // } catch (error) {
    //     console.log(error.message)
    // }
})

//addToken
userSchema.methods.generateAuthToken = async function() {
    const user = this
    const token = jwt.sign({ _id: this._id.toString() }, process.env.JWT)
    user.tokens = this.tokens.concat({ token })
    await user.save()
    return token;
}

// Login 
userSchema.statics.logMeOn = async(email, password) => {
    const user = await User.findOne({ email })
    if (!user) throw new Error('invalid email')
    const matchPass = await bcrypt.compare(password, user.password)
    if (!matchPass) throw new Error('invalid pass')
    return user
}

const User = mongoose.model('User', userSchema)
module.exports = User