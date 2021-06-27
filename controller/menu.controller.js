// To used model file
const Menu = require('../models/menu.model')

// Add main category 
const addMainCat = async (req, res) => {
    try {
        let menu = new Menu(req.body)
        await menu.save()
        res.status(200).send({
            apiStatus: true,
            menu: {menu},
            message: `data inserted`
        })
    }
    catch(error) {
        res.status(500).send({
            apiStatus: false,
            menu: error,
            message: `Check data to insert`
        })
    }
}

// Edit name of main category
const editMainNameCat = async(req, res) => {
    try {
        id = req.params.id
        let data = await Menu.findById(id)
        let objkeys = Object.keys(req.body)
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
        let menu = await Menu.find()
        if(!menu) throw new Error (`Data not founded`)
        res.status(200).send({
            apiStatus: true,
            menu: {menu},
            message: `All data cats`
        })
    }
    catch(error) {
        res.status(500).send({
            apiStatus: false,
            menu: error,
            message: `Not found! Check data`
        })
    }
}

// Show single main cat
const displySingleCat = async (req,res) => {
    try {

        let id = req.params.id
        let data = await Menu.findById(id)

        if(!data) throw new Error (`Data not founded of category`)

        res.status(200).send({
            apiStatus: true,
            menuSingle: {data},
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
        let data = await Menu.findById(id)

        if(!data) throw new Error (`Data not founded of category `)
        
        await data.remove()

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

// Add meal in categoray
const addMealInCat = async(req, res) => {
    try {
        let id = req.params.id
        let data = req.body
        let category = await Menu.findById(id)
        if(!category) throw new Error (`Category not found`)
        await category.meals.push(data)
        await category.save()
        res.status(200).send({
            apiStatus: true,
            meanuOfMeals: {data},
            message: `Meal inserted`
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

// Add global additions ***** check unique name addition !? ****
const addGlobalAddition = async (req, res) => {
    try {
        let id = req.params.id
        let data = req.body

        let category = await Menu.findById(id)
        
        await category.additions.push(data) 
        await category.save()

        res.status(200).send({
            apiStatus: true,
            menuOfAddition: {data},
            message: `Addition inserted`
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

// Add general_offers
const addGeneralOffers = async (req,res) => {
    try {
        let id = req.params.id
        let data = req.body
        let category = await Menu.findById(id)

        await category.general_offers.push(data) 
        await category.save()

        res.status(200).send({
            apiStatus: true,
            menuOfOffer: {data},
            message: `Offers inserted`
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

    addMealInCat,

    addGlobalAddition,

    addGeneralOffers
    
}