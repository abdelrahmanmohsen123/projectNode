const User = require('../models/users.model')

const fs = require('fs')

const multer = require('multer')

// Uploaded image
let imgName = ''
let erroEx = 'Please unsert valid image'
// let uploadedFile = ''

function uploadedFile () {
    let storage = multer.diskStorage({
        destination: function (req, res, cb) { cb (null, 'images') },
        
        filename: function(req, file, cb) {

            let exImg = `${(file.originalname.split('.').pop())}`

            let lowerExImg = exImg.toLowerCase()

            imgName = `${Date.now()}.${lowerExImg}`

            cb(null, imgName)
        }
    })
    uploadImg = multer({ storage })
    return uploadImg
}


const userRegister = async(req, res) => {
    
    try {
        let data = new User(req.body)

        // Valid image 
        let exImg = `${(imgName.split('.').pop())}`

        let allowedEx = ['jpg', 'png', 'jpeg', 'svg']
        
        // if(allowedEx.includes(lowerExImg)) imgName = `${Date.now()}.${lowerExImg}`
        // else imgName = `../avatar/avatar.jpeg`

        if(!allowedEx.includes(exImg)) throw new Error (`Please insert valid image`)
        data.userImage = imgName
        data.activateCode = Math.random()
        await data.save()

        res.status(200).send({
            status: true,
            userData: data,
            message: 'user inserted'
        })
    } 

    catch (e) {
        res.status(500).send({
            status: false,
            userData: e.message,
            message: 'data error to register'
        })
    }
}

const showAllUser = async (req, res) => {
    try {
        let allUsers = await User.find()
        res.status(200).send({
            status: true,
            message: "all user are",
            allUsers: allUsers,

        })

    } catch (e) {
        res.status(500).send({
            status: false,
            dataAll: e,
            message: 'error in show data'
        })
    }

}

const editUser = async(req, res) => {
    reqEdit = Object.keys(req.body)
    editItems = ['fname', 'lname', 'password', 'userImage', 'phone']
    allowedEdit = reqEdit.every(item => editItems.includes(item))
    if (!allowedEdit) return res.status(500).send({
        status: false,
        message: 'invalid edit user'
    })

    try {
        id = req.params.id
        data = await User.findById(id)
        oldImage = data.userImage
        data.userImage = imgName

        reqEdit.forEach(update => {
            data[update] = req.body[update]
        })

        fs.unlink(`images/${oldImage}`, (error) => {
            if(error) `Error`
        })

        await data.save()
        res.status(200).send({
            status: true,
            message: 'updated user success'
        })
    } catch (error) {
        res.status(500).send({
            status: false,
            message: error.message
        })
    }
}

module.exports = {
    uploadedFile,
    userRegister,
    showAllUser,
    editUser
}
