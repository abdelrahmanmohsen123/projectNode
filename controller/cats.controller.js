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
            cats: cats,
            message: `data inserted`
        })
    }
    catch(error) {
        res.status(500).send({
            apiStatus: false,
            result: error,
            message: `Check data to insert`
        })
    }
}

// Edit name of main category
const editMainNameCat = async(req, res) => {
    try {
        id = req.params.id
        let data = await Cats.findById(id)
        let objkeys = Object.keys(req.body)
        if(objkeys.length == 0)  throw new Error ()
        let allowUpdate = ['catName']
        let validUpdate = objkeys.every(cat => allowUpdate.includes(cat))
        
        if(!validUpdate) res.status(500).send({
            apiStatus: false,
            message: `Not allowed update ${allowUpdate} only`
        })
        objkeys.forEach(cat => data[cat] = req.body[cat])
        await data.save()
        res.status(200).send({
            apiStatus: true,
            message: `Updated success ${allowUpdate}`
        })
    }
    catch(error) {
        res.status(500).send({
            apiStatus: false,
            message: `Check data to update`
        })
    }
}

// Display all main category
const displayAllMainCats = async (req, res) => {
    try {
        let cats = await Cats.find()
        if(!cats) throw new Error (`Data not founded`)
        res.status(200).send({
            apiStatus: true,
            success: cats,
            message: `All data cats`
        })
    }
    catch(error) {
        res.status(500).send({
            apiStatus: false,
            result: error,
            message: `Not found! Check data`
        })
    }
}

// Show single main cat
const displySingleCat = async (req,res) => {
    try {

        let id = req.params.id
        let data = await Cats.findById(id)

        if(!data) throw new Error (`Data not founded of category`)

        res.status(200).send({
            apiStatus: true,
            CatsSingle: {data},
            message: `Single category`
        })
    }
    catch(error){
        res.status(500).send({
            apiStatus: false,
            result: error.message,
            message: `Check data`
        })
    }
    
}

// Delete single cat
const delSingleCat = async (req, res) => {
    try {
        let id = req.params.id
        await Items.deleteMany({cat_id:id})
        await Cats.findByIdAndDelete(id)
        res.status(200).send({
            apiStatus: true,
            message: `Deleted done`
        })
    }
    catch(error){
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
    addMainCat,
    editMainNameCat,
    displayAllMainCats,
    displySingleCat,
    delSingleCat,
}