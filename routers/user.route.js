const express = require('express')
const userRoute = express.Router()
const pool = require('../db/db.config')
const authMidleware = require('../middlawers/auth-middlewares')
const rolesMiddleware = require('../middlawers/role-midleware')
const userController = require('../controller/user-controller')


userRoute.post('/created',authMidleware,rolesMiddleware('admin'),userController.post)


userRoute.get('/find/:id',authMidleware,rolesMiddleware('admin'),userController.get)


userRoute.put('/update/:id',authMidleware,rolesMiddleware('admin'),userController.put)


userRoute.delete('/remove/:id',authMidleware,rolesMiddleware('admin'),userController.remove)




module.exports = userRoute