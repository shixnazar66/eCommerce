const express = require('express')
const productRoute = express.Router()
const authMidleware = require('../middlawers/auth-middlewares')
const rolesMiddleware = require('../middlawers/role-midleware')
const productController = require('../controller/product-controller')
const pool = require('../db/db.config')



productRoute.post('/created',authMidleware,rolesMiddleware('admin'),productController.post)


productRoute.get('/',authMidleware,rolesMiddleware('admin'),productController.findAll)


productRoute.get('/getid/:id',authMidleware,rolesMiddleware('admin'),productController.get)


productRoute.put('/update/:id',authMidleware,rolesMiddleware('admin'),productController.put)


productRoute.delete('/remove/:id',authMidleware,rolesMiddleware('admin'),productController.remove)


productRoute.post('/rename',(req,res)=>{
pool.query('ALTER TABLE product RENAME COLUMN descSHortUZ TO descSHORTUZ;')
res.send('bingo')
})



module.exports = productRoute

