const express = require('express')

const router = new express.Router()

const User = require('../models/users.model')

const auth = require('../middleware/auth')
const multer = require('multer')
const fs = require('fs')


///// upload photo
imgname = ''
let storage = multer.diskStorage({
    destination: function(req, res, cb) { cb(null, 'images') },
    filename: function(req, file, cb) {
        imgname = Date.now() + '.' + (file.originalname.split('.').pop())
        cb(null, imgname)
    }
})
let upload = multer({ storage: storage })
    /// register user
router.post('/user/register', upload.single('userImage'), async(req, res) => {
    let data = new User(req.body)
    try {
        data.userImage = imgname
        data.activateCode = Math.random()
        await data.save()

        res.status(200).send({
            status: true,
            userData: data,
            message: 'user inserted'
        })

    } catch (e) {
        res.status(500).send({
            status: false,
            userData: e.message,
            message: 'data error to register'
        })
    }
})

//get all user
router.get('/user/all', async(req, res) => {
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

})

//get single user
router.get('/user/single/:id', auth.adminAuth, async(req, res) => {
    try {
        let user_id = req.params.id
        let showUser = await User.findById(user_id)
            //console.log(showUser)
        if (!showUser) return res.status(500).send({
            apiStatus: false,
            result: error,
        })
        res.status(200).send({
            apiStatus: true,
            result: showUser,
            message: `Data of user`
        })
    } catch (error) {
        res.status(500).send({
            apiStatus: false,
            result: error.message,
            message: `Can't show data`
        })
    }
})

//delete acc by admin
router.delete('/user/delUser/:id', auth.adminAuth, async(req, res) => {
    try {
        let id = req.params.id
        console.log(id)

        await User.findOneAndDelete(id)
        res.status(200).send({
            apiStatus: true,
            message: `Deleted Done`
        })
    } catch (error) {
        res.status(500).send({
            apiStatus: false,
            result: error,
            message: `Can't delete`
        })
    }
})


//delete acc by user
router.delete('/user/delete', auth.userAuth, async(req, res) => {
    try {

        await req.user.remove()
        res.status(200).send({
            apiStatus: true,
            message: `Deleted Done`
        })
    } catch (error) {
        res.status(500).send({
            apiStatus: false,
            result: error,
            message: `Can't delete`
        })
    }
})
router.patch('/user/edit/:id', upload.single('userImage'), auth.generalAuth, async(req, res) => {
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
        data.userImage = imgname
        reqEdit.forEach(update => {
            data[update] = req.body[update]
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
})


//login to user
router.post('/user/login', async(req, res) => {
    try {
        let user = await User.logMeOn(req.body.email, req.body.password)

        //console.log(user)
        let token = await user.generateAuthToken()
        res.status(200).send({
            status: true,
            userData: { token, user },
            message: "logged in"
        })
    } catch (error) {
        res.status(500).send({
            status: false,
            err: error.message,
            message: "error in log in"
        })
    }
})

router.patch('/admin/activate/:id', auth.adminAuth, async(req, res) => {
    try {
        id = req.params.id
        user = await User.findById(id)
        user.accountStatus = true
        await user.save()
        res.status(200).send({
            status: true,
            message: 'user be activate'
        })
    } catch (error) {
        res.status(500).send({
            status: false,
            error: error.message
        })
    }
})

router.patch('/admin/deactivate/:id', auth.adminAuth, async(req, res) => {
    try {
        id = req.params.id
        user = await User.findById(id)
        user.accountStatus = false
        await user.save()
        res.status(200).send({
            status: true,
            message: 'user be not activate'
        })
    } catch (error) {
        res.status(500).send({
            status: false,
            error: error.message
        })
    }
})


/// activate user by rand code (need to func email or phone to activate code)
router.patch('/user/activate', auth.userAuth, async(req, res) => {
    try {
        let code = req.body.activateCode
        if (code == req.user.activateCode) {
            req.user.accountStatus = true
        }


        await req.user.save()
        res.status(200).send({
            status: true,
            message: 'user activate'
        })
    } catch (error) {
        res.status(500).send({
            status: false,
            error: error.message
        })
    }
})


// logout from user
router.delete('/logout', auth.generalAuth, async(req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(ele => {
            return ele.token != req.token
        })
        await req.user.save()
        res.status(200).send({
            status: true,
            message: 'logged out'
        })
    } catch (e) {
        res.status(500).send({
            status: false,
            message: 'error',
            error: e.message
        })
    }
})

router.delete('/logoutAll', auth.generalAuth, async(req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.status(200).send({
            status: true,
            message: 'logged out'
        })
    } catch (e) {
        res.status(500).send({
            status: false,
            message: 'error',
            error: e.message
        })
    }
})



module.exports = router