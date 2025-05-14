const express = require('express')
const route = express.Route()
const orderItem = require('./src/controllers/orderItemController')
const orderCart = require('./src/controllers/orderCartController')
const auth = require('./src/middlewares/authMiddleware')
route.post('api/order/item', auth, orderItem)
route.post('api/order/cart', auth, orderCart)
module.exports = route
