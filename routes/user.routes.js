const express = require('express')

const router = new express.Router()

const User = require('../models/users.model')

const userController = require('../controller/user.controller')

const auth = require('../middleware/auth')


// register user 
router.post('/user/register', userController.uploadedFile().single('userImage'), userController.userRegister)

// get all user
router.post('/user/all', userController.showAllUser)

// get single user
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

// delete acc by admin
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


// delete acc by user
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

// User edit 
router.patch('/user/edit/:id', auth.adminAuth, userController.uploadedFile().single('userImage'), userController.editUser)


// login to user
router.post('/user/login', userController.userLogin)

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

// activate user by rand code (need to func email or phone to activate code)
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