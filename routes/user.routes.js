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
            userData:  user 
        })

    } catch (e) {
        res.status(500).send({
            status: false,
            error: e.message,
            message: 'data error to register'
        })
    }
})

router.get('/user/all', async(req, res) => {
    try {
        const allUsers = await User.find()
        res.status(200).send({
            status: true,
            data: allUsers,
            message : allUsers
        })
        
    } catch (e) {
        res.status(500).send({
            status: false,
            error: e,
            message: 'error in show data'
        })
    }

})

router.get('/user/single/:id',auth.adminAuth ,async(req, res) => {
    try {
        let user = req.params.id
        let showUser = await User.findById(user)
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

router.delete('/user/delUser/:id', auth.adminAuth,async(req, res) => {
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

router.delete('/user/delete', auth.authMe, async(req,res)=>{
    try{    
        await req.user.remove()
        await user.save()
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
router.patch('/user/edit/:id',auth.generalAuth ,async(req, res) => {
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
        let user = await User.logMeOn(req.body.email, req.body.password)
        //console.log(user)
        let token = await user.generateAuthToken()
        res.status(200).send({
            status: true,
            data: {token,user},
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

router.patch('/admin/activate/:id', auth.adminAuth,async(req, res) => {
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

router.patch('/admin/deactivate/:id',auth.adminAuth ,async(req, res) => {
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

router.patch('/user/activate', auth.authMe, async(req,res)=>{
    try{
        req.user.accountStatus=true
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

router.post('/logout',auth.generalAuth, async(req,res)=>{
    try{
        req.user.tokens = req.user.tokens.filter(ele=>{
            return ele.token!=req.token
        })
        await req.user.save()
        res.status(200).send({
            status:true,
            message:'logged out'
        })
    }
    catch(e){
        res.status(500).send({
            status:false,
            message:'error',
            error:e.message
        })
    }
})

router.post('/logoutAll',auth.generalAuth, async(req,res)=>{
    try{
        req.user.tokens=[]
        await req.user.save()
        res.status(200).send({
            status:true,
            message:'logged out'
        })
    }
    catch(e){
        res.status(500).send({
            status:false,
            message:'error',
            error:e.message
        })
    }
})

module.exports = router