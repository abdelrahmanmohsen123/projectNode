const express = require('express')

const router = new express.Router()

const User = require('../models/users.model')

const auth = require('../middleware/auth')

router.post('/user/register', async(req, res) => {
    try {
        let user = new User(req.body)
        await user.save()
        res.status(200).send({
            status: true,
            message: 'user inserted',
            userData: { user }
        })

    } catch (e) {
        res.status(500).send({
            status: false,
            error: e.message,
            message: 'data error to register'
        })
    }
})

router.post('/user/all', async(req, res) => {
    try {
        const allUsers = await User.find()
        res.status(200).send({
            status: true,
            data: allUsers
        })
        console.log(allUsers)
    } catch (e) {
        res.status(500).send({
            status: false,
            error: e.message,
            message: 'error in show data'
        })
    }

})

router.post('/user/single/:id', async(req, res) => {
    try {
        let user = req.params.id
        let showUser = await User.findById(user)

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

router.delete('/user/delUser/:id', async(req, res) => {
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

router.patch('/user/edit/:id', async(req, res) => {
    reqEdit = Object.keys(req.body)
    editItems = ['fname', 'lname', 'password']
    allowedEdit = reqEdit.every(item => editItems.includes(item))
    if (!allowedEdit) return res.status(500).send({
        status: false,
        message: 'invalid edit user'
    })

    try {
        id = req.params.id
        data = await User.findById(id)
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

router.post('/user/login', async(req, res) => {
    try {
        const user = await User.logMeOn(req.body.email, req.body.password)
            // console.log(user)
        const token = await user.generateAuthToken()
        console.log(token)
        res.status(200).send({
            status: true,
            data: { user, token },
            message: "logged in"
        })
    } catch (error) {
        res.status(500).send({
            status: false,
            data: error.message,
            message: "error in log in"
        })
    }
})

router.patch('/user/activate/:id', async(req, res) => {
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

router.patch('/user/deactivate/:id', async(req, res) => {
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

module.exports = router