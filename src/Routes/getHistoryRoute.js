const express = require('express')
const route = Route.express()
const auth = require('./src/middlewares/authMiddleware')
const getHistory = require('./src/controllers/getHistoryController')
route.get('api/user/history', auth, getHistory)
model.exports = route;
