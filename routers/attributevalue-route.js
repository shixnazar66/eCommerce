const express = require('express')
const attributevalueRoute = express.Router()
const authMidleware = require('../middlawers/auth-middlewares')
const rolesMiddleware = require('../middlawers/role-midleware')
const attributevalueController = require('../controller/attributevalue-controller')



attributevalueRoute.post('/created',authMidleware,rolesMiddleware('admin'),attributevalueController.post)


attributevalueRoute.get('/find',authMidleware,rolesMiddleware('admin'),attributevalueController.findALL)


attributevalueRoute.get('/getid/:id',authMidleware,rolesMiddleware('admin'),attributevalueController.get)


attributevalueRoute.put('/update/:id',authMidleware,rolesMiddleware('admin'),attributevalueController.update)


attributevalueRoute.delete('/remove/:id',authMidleware,rolesMiddleware('admin'),attributevalueController.remove)



module.exports = attributevalueRoute