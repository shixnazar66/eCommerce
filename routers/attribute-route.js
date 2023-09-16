const express = require('express')
const attributeRoute = express.Router()
const authMidleware = require('../middlawers/auth-middlewares')
const rolesMiddleware = require('../middlawers/role-midleware')
const attributeController = require('../controller/attribute-controller')


attributeRoute.post('/created',authMidleware,rolesMiddleware('admin'),attributeController.post)


attributeRoute.get('/',attributeController.findALLgetby)


attributeRoute.get('/',attributeController.findALL)


attributeRoute.get('/getid/:id',authMidleware,rolesMiddleware('admin'),attributeController.get)


attributeRoute.put('/update/:id',authMidleware,rolesMiddleware('admin'),attributeController.update)


attributeRoute.delete('/remove/:id',authMidleware,rolesMiddleware('admin'),attributeController.remove)




module.exports = attributeRoute