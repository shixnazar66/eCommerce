const express = require('express')
const categoryRoute = express.Router()
const authMidleware = require('../middlawers/auth-middlewares')
const rolesMiddleware = require('../middlawers/role-midleware')
const categoryController = require('../controller/category-controller')



categoryRoute.post('/controller',authMidleware,rolesMiddleware('admin','moderator'),categoryController.post)


categoryRoute.get('/findAll',categoryController.findAll)


categoryRoute.get('/getid/:id',categoryController.getById)


categoryRoute.put('/update/:id',authMidleware,rolesMiddleware('admin'),categoryController.put)


categoryRoute.delete('/remove/:id',authMidleware,rolesMiddleware('admin'),categoryController.remove)

 




module.exports = categoryRoute



