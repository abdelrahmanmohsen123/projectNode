// To used model file
const Cats = require('../models/cats.model')
const Items = require('../models/item.model')

// Add main category 
const addMainCat = async (req, res) => {

    try {
        let cats = new Cats(req.body)
        await cats.save()
        res.status(200).send({
            apiStatus: true,
            success: cats,
            message: `data inserted`
        })
    }
    catch (error) {
        res.status(500).send({
            apiStatus: false,
            result: error,
            message: `Check data to insert`
        })
    }
}

// Edit name of main category
const editMainNameCat = async (req, res) => {
    try {
        let id = req.params.id
        let data = await Cats.findById(id)

        let objkeys = Object.keys(req.body)
        if (objkeys.length == 0) throw new Error (`Please insert category name`)
        let allowUpdate = ['catName']
        
        let validUpdate = objkeys.every(cat => allowUpdate.includes(cat))

        if (!validUpdate) throw new Error (`Allowed update ${allowUpdate} only`)

        objkeys.forEach(cat => data[cat] = req.body[cat])
        await data.save()

        res.status(200).send({
            apiStatus: true,
            message: `Updated success ${allowUpdate}`
        })
    } 
    catch (error) {
        res.status(500).send({
            apiStatus: false,
            result: error.message,
            message: `Check data to update`
        })
    }
}

// Display all main category
const displayAllMainCats = async (req, res) => {
    try {
        let cats = await Cats.find()
        if (!cats) throw new Error()
        res.status(200).send({
            apiStatus: true,
            success: cats,
            message: `All data cats`
        })
    } 
    catch (error) {
        res.status(500).send({
            apiStatus: false,
            result: error,
            message: `Not found! Check data`
        })
    }
}

// Show single main cat
const displySingleCat = async (req, res) => {
    try {

        let id = req.params.id
        let data = await Cats.findById(id)
        if (!data) throw new Error()

        let itemData = await Items.find({ cat_id: id })

        res.status(200).send({
            apiStatus: true,
            success: data,
            itemData: itemData, // ???!!!
            message: `Single category`
        })
    } 
    catch (error) {
        res.status(500).send({
            apiStatus: false,
            result: error,
            message: `Data not founded of category`
        })
    }

}

// Delete single cat
const delSingleCat = async (req, res) => {
    try {
        let id = req.params.id
        let data = await Cats.findByIdAndDelete(id)
        if (!data) throw new Error ()

        await Items.deleteMany({ cat_id: id })
        res.status(200).send({
            apiStatus: true,
            message: `Deleted done`
        })
    } 
    catch (error) {
        res.status(500).send({
            apiStatus: false,
            result: error,
            message: `Not founded data`
        })
    }
}

// To exports function controller
module.exports = {
    // Main category
    addMainCat,
    editMainNameCat,
    displayAllMainCats,
    displySingleCat,
    delSingleCat,
}