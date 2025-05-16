const express = require('express')
const route = Router.express()
const addToCart = require('./src/controllers/addCartController')
const auth = require('./src/middlewares/authMiddleware')
route.post('api/cart/Add', auth, addToCart)
module.exports = route;
