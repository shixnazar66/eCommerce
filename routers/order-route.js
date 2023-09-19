const express = require('express')
const orderRoute = express.Router()
const authMidleware = require('../middlawers/auth-middlewares')
const rolesMiddleware = require('../middlawers/role-midleware')
const orderController = require('../controller/order-controller')


orderRoute.post('/created',authMidleware,rolesMiddleware('admin'),orderController.post)


orderRoute.get('/',authMidleware,rolesMiddleware('admin'),orderController.findAll)


orderRoute.get('/get/:id',authMidleware,rolesMiddleware('admin'),orderController.get)


orderRoute.put('/update/:id',authMidleware,rolesMiddleware('admin'),orderController.update)


orderRoute.delete('/remove/:id',authMidleware,rolesMiddleware('admin'),orderController.remove)




module.exports = orderRoute