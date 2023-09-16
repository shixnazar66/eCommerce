const express = require('express')
const addressRoute = express.Router()
const addressController = require('../controller/address-controller')
const authMidleware = require('../middlawers/auth-middlewares')
const rolesMiddleware = require('../middlawers/role-midleware')


addressRoute.post('/created',authMidleware,rolesMiddleware('admin'),addressController.post)


addressRoute.get('/getid/:id',authMidleware,rolesMiddleware('admin'),addressController.get)


addressRoute.get('/',authMidleware,rolesMiddleware('admin'),addressController.findALL)


addressRoute.put('/update/:id',authMidleware,rolesMiddleware('admin'),addressController.put)


addressRoute.delete('/remove/:id',authMidleware,rolesMiddleware('admin'),addressController.remove)





module.exports = addressRoute