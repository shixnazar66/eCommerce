const express = require('express')
const favoriteRoute = express.Router()
const authMidleware = require('../middlawers/auth-middlewares')
const rolesMiddleware = require('../middlawers/role-midleware')
const favoriteController = require('../controller/favorite-controller')


favoriteRoute.post('/created',authMidleware,rolesMiddleware('admin'),favoriteController.post)


favoriteRoute.get('/get/:id',authMidleware,rolesMiddleware('admin'),favoriteController.get)


favoriteRoute.put('/update/:id',authMidleware,rolesMiddleware('admin'),favoriteController.update)


favoriteRoute.delete('/remove/:id',authMidleware,rolesMiddleware('admin'),favoriteController.remove)



module.exports = favoriteRoute