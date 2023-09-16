const express = require('express')
const basketRoute = express.Router()
const authMidleware = require('../middlawers/auth-middlewares')
const rolesMiddleware = require('../middlawers/role-midleware')
const basketController = require('../controller/basket-conntroller')


basketRoute.post('/created',authMidleware,rolesMiddleware('admin'),basketController.post)


basketRoute.get('/get/:id',authMidleware,rolesMiddleware('admin'),basketController.get)


basketRoute.put('/update/:id',authMidleware,rolesMiddleware('admin'),basketController.update)


basketRoute.delete('/remove/:id',authMidleware,rolesMiddleware('admin'),basketController.remove)


module.exports = basketRoute