const jwt = require('jsonwebtoken')

const User = require('../models/users.model')

const adminAuth = async(req, res, next) => {
    try {
        const token = req.header('Authorization').replace('bearer ', '')
        const myDecodedToken = jwt.verify(token, process.env.JWT)
        const user = await User.findOne({
            _id: myDecodedToken._id, 
            'tokens.token': token,
            userType: 'admin'
        })
        if (!user) throw new Error(`Unauthorized root`)
        req.user = user
        req.token = token
        next()
    } catch (error) {
        res.status(500).send({
            apiStatus: false,
            result: error.message,
            message: 'unauthorized'
        })
    }
}


const userAuth = async(req, res, next) => {
    try {
        const token = req.header('Authorization').replace('bearer ', '')
        const myDecodedToken = jwt.verify(token, process.env.JWT)
        const user = await User.findOne({
            _id: myDecodedToken._id,
            'tokens.token': token,
            userType: 'user'
        })
        if (!user) throw new Error(`Unauthorized user`)
        req.user = user
        req.token = token
        next()
    } catch (error) {
        res.status(500).send({
            apiStatus: false,
            result: error.message,
            message: 'unauthorized'
        })
    }
}

const generalAuth = async(req, res, next) => {
    try {
        const token = req.header('Authorization').replace('bearer ', '')
        const myDecodedToken = jwt.verify(token, process.env.JWT)
        const user = await User.findOne({
            _id: myDecodedToken._id,
            'tokens.token': token
        })
        if (!user) throw new Error()
        req.user = user
        req.token = token
        next()
    } catch (e) {
        res.status(500).send({
            status: false,
            error: e.message,
            message: 'unauthorized'
        })
    }
}






module.exports = {
    adminAuth,
    userAuth,
    generalAuth
}