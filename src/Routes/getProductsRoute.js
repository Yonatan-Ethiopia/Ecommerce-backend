const express = require('express')
const route = Router.express()
const getProducts = require('./src/controllers/productsController')
const filter = require('./src/controllers/filterItems')
const auth = require('./src/middlewares/authMiddleware')
route.get('api/products', auth, getProducts)
route.get('api/products/filter', filter)
module.exports = route;
