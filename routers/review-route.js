const express = require('express')
const reviewRoute = express.Router()
const authMidleware = require('../middlawers/auth-middlewares')
const rolesMiddleware = require('../middlawers/role-midleware')
const reviewController = require('../controller/review-controller')


reviewRoute.post('/created',authMidleware,rolesMiddleware('admin'),reviewController.post)


reviewRoute.post('/',authMidleware,rolesMiddleware('admin'),reviewController.findAll)


reviewRoute.post('/get/:id',authMidleware,rolesMiddleware('admin'),reviewController.get)


reviewRoute.post('/update/:id',authMidleware,rolesMiddleware('admin'),reviewController.update)


reviewRoute.post('/remove/:id',authMidleware,rolesMiddleware('admin'),reviewController.remove)



module.exports = reviewRoute