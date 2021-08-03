const User = require('../models/users.model')

const fs = require('fs')

const multer = require('multer')

// Uploaded image
let imgName = ''
let erroExtention = 'Please insert valid image'
// let uploadedFile = ''

let uploadedFile = () => {
    let storage = multer.diskStorage({
        destination: (req, res, cb) => { cb(null, 'images') },

        filename: (req, file, cb) => {

            let extentionImage = `${(file.originalname.split('.').pop())}`

            let lowerExImg = extentionImage.toLowerCase()

            imgName = `${Date.now()}.${lowerExImg}`

            cb(null, imgName)
        }
    })
    uploadImg = multer({ storage })
    return uploadImg
}

const userRegister = async (req, res) => {

    try {
        let data = new User(req.body)

        // // Valid image 
        // let exImg = `${(imgName.split('.').pop())}`

        // let allowedEx = ['jpg', 'png', 'jpeg', 'svg']

        // // if(allowedEx.includes(lowerExImg)) imgName = `${Date.now()}.${lowerExImg}`
        // // else imgName = `../avatar/avatar.jpeg`


        // // if(data.userImage == '') imgName = `../avatar/avatar.jpeg`


        // if(!allowedEx.includes(exImg)) throw new Error (`Please insert valid image`)

        data.userImage = imgName

        // data.activateCode = Math.random()
        await data.save()

        res.status(200).send({
            status: true,
            success: data,
            message: `Congratulations! to register`
        })
    }

    catch (error) {
        res.status(500).send({
            status: false,
            result: error,
            message: `Check data to register`
        })
    }
}

const userLogin = async (req, res) => {
    try {
        let user = await User.logMeOn(req.body.email, req.body.password)
        let token = await user.generateAuthToken()
        res.status(200).send({
            status: true,
            success: { token, user },
            message: "Logged in success"
        })
    }
    catch (error) {
        res.status(500).send({
            status: false,
            result: error,
            message: "Check! email or password"
        })
    }
}

const showAllUser = async (req, res) => {
    try {
        let allUsers = await User.find()
        if (!allUsers) throw new Error()
        res.status(200).send({
            status: true,
            success: allUsers,
            message: "All users"
        })

    } catch (error) {
        res.status(500).send({
            status: false,
            result: error,
            message: 'There are no users'
        })
    }

}

const showSingleUser = async (req, res) => {
    try {
        let user_id = req.params.id
        let showUser = await User.findById(user_id)
        //console.log(showUser)
        if (!showUser) throw new Error()
        res.status(200).send({
            apiStatus: true,
            success: showUser,
            message: `Data of single user`
        })
    } catch (error) {
        res.status(500).send({
            apiStatus: false,
            result: error,
            message: `There is no data`
        })
    }
}

const editUser = async (req, res) => {
    try {
        let keyStore = Object.keys(req.body)
        let editUser = ['fname', 'lname', 'password', 'userImage', 'phone', 'email']
        let allowedEdit = keyStore.every(user => editUser.includes(user))
        if (!allowedEdit) throw new Error(`allow to update ${editUser} only`)
        let id = req.params.id
        let data = await User.findById(id)
        let oldImage = data.userImage
        data.userImage = imgName

        keyStore.forEach(update => {
            data[update] = req.body[update]
        })

        fs.unlink(`images/${oldImage}`, (error) => { if (error)`Error image` })
        await data.save()
        res.status(200).send({
            status: true,
            success: data,
            message: 'updated user success'
        })
    }
    catch (error) {
        res.status(500).send({
            status: false,
            result: error.message,
            message: 'check data to update'
        })
    }
}

const logOut = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(ele => ele.token != req.token)
        await req.user.save()
        res.status(200).send({
            status: true,
            message: 'logged out'
        })
    }
    catch (error) {
        res.status(500).send({
            status: false,
            result: error.message,
            message: 'error'
        })
    }
}

const logOutAll = async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.status(200).send({
            status: true,
            message: 'logged out all'
        })
    }
    catch (error) {
        res.status(500).send({
            status: false,
            result: error.message,
            message: 'error'

        })
    }
}

module.exports = {
    uploadedFile,
    userRegister,
    userLogin,
    showAllUser,
    showSingleUser,
    editUser,
    logOut,
    logOutAll
}
