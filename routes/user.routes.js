const express = require('express')

const router = new express.Router()

const User = require('../models/users.model')

const auth = require('../middleware/auth')






module.exports = router