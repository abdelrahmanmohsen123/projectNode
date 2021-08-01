// To used model file
const Cats = require('../models/cats.model')
const Items = require('../models/item.model')
const multer = require('multer')
const fs = require('fs')

// upload photo
let imgName = ''

function uploadItemImg() {
    let storage = multer.diskStorage({
        destination: function(req, res, cb) { cb(null, 'itemImage') },
        filename: function(req, file, cb) {
            imgName = `${Date.now()}.${(file.originalname.split('.').pop())}`
            cb(null, imgName)
        }
    })
    upload = multer({ storage })
    // console.log(upload)
    return upload
}

// Add main item 
const addItem = async(req, res) => {

    try {

        let cat = await Cats.findById(req.body.cat_id)
        if (cat == null) throw new Error('not found category')
        
        let items = new Items({ ...req.body })

        items.itemImage = imgName

        disCount = .05

        items.size.forEach(item => {
            console.log(item.sizeType ,item.price)
        })

        items.offer_item.forEach(offer => {
            console.log(offer)
        })

        // console.log(items)

       
        
        // await items.save()
    
        res.status(200).send({
            apiStatus: true,
            success: items,
            message: `item inserted`
        })
    } 
    catch (error) {
        res.status(500).send({
            apiStatus: false,
            result: error.message,
            message: `Check data to insert`
        })
    }
}

// Edit name of main category
const editItem = async(req, res) => {
    try {
        id = req.params.id
        let data = await Items.findById(id)
        let objkeys = Object.keys(req.body)
        if (objkeys.length == 0) throw new Error()
        let allowUpdate = ['cat_id', 'name', 'itemImage', 'DateFrom', 'DateTo', 'description', 'size', 'offer_item']
        let validUpdate = objkeys.every(item => allowUpdate.includes(item))

        if (!validUpdate) res.status(500).send({
            apiStatus: false,
            message: `Not allowed update ${allowUpdate} only`
        })
        objkeys.forEach(item => data[item] = req.body[item])
        await data.save()
        res.status(200).send({
            apiStatus: true,
            success: data,
            message: `Updated success ${allowUpdate}`
        })
    } catch (error) {
        res.status(500).send({
            apiStatus: false,
            result: error.message,
            message: `Check data to update`
        })
    }
}

//Display all main items
const showAllItems = async(req, res) => {
    try {
        let items = await Items.find()
        if (!items) throw new Error(`Data not founded`)
        res.status(200).send({
            apiStatus: true,
            success: items,
            message: `All data ITEMS`
        })
    } catch (error) {
        res.status(500).send({
            apiStatus: false,
            result: error,
            message: `Not found! Check data`
        })
    }
}

//  Show single main item
const showSingleItem = async(req, res) => {
        try {
            let id = req.params.id
            let data = await Items.findById(id)

            if (!data) throw new Error(`Data not founded of items`)

            res.status(200).send({
                apiStatus: true,
                success: data,
                message: `Single Item`
            })
        } catch (error) {
            res.status(500).send({
                apiStatus: false,
                result: error.message,
                message: `Check data`
            })
        }

}
    //Delete single cat
const delSingleItem = async(req, res) => {

    try {

        let id = req.params.id
        let data = await Items.findById(id)

        if (!data) throw new Error(`Data not founded of category `)

        await data.remove()

        res.status(200).send({
            apiStatus: true,
            message: `Deleted done`
        })
    } catch (error) {
        res.status(500).send({
            apiStatus: false,
            result: error.message,
            message: `Check data`
        })
    }
}


// To exports function controller
module.exports = {
    // Main category
    addItem,
    showAllItems,
    showSingleItem,
    delSingleItem,
    editItem,
    uploadItemImg
}