const express = require('express')
const route = Router.express()
const getProducts = require('./src/controllers/getProducts')
const auth = require('./src/middlewares/authMiddleware')
route.get('api/products', auth, getProducts)
module.exports = route;
