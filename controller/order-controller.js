const pool = require('../db/db.config')
const { use } = require('../routers/order-route')
const Pagination = require('../utils/pagination')



async function post(req,res,next){
    try {
    const {productID,userID,addressID,deliveryTime,orderStatus,deliveryPrice} = req.body
    if(!productID || !userID || !addressID){
        throw new Error('not found')
    }
    const params = {productID,userID,addressID,deliveryTime,orderStatus,deliveryPrice}
    const product = await pool.query(`select * from product where ID = ${productID}`)
    const user = await pool.query(`select * from user where ID = ${userID}`)
    const address = await pool.query(`select * from address where ID = ${addressID}`)
    if(!product || !user || !address){
        throw new Error('not found')
    }
    const query = 'insert into order set ?'
    await pool.query(query,params)
    res.send('bingo')
    } catch (error) {
    next(error)
    }
}


async function findAll(req,res,next){
    try {
    const {page, paginationLimit} = req.query
    const [data] = await pool.query(`select * from order`)
    if(data[0].ID == undefined){
        throw new Error('order ID not found')
    }
    const find = new Pagination(page,paginationLimit,data.length)
    const order = await pool.query(`select * from order LIMIT ${find.limit} OFFSET ${find.offset}`)
    res.send({data:order,Pagination:find})
    } catch (error) {
    next(error)
    }
}


async function get(req,res,next){
    try {
    const ID = req.params.id
    const [[order]] = await pool.query(`select * from order where ID = ${ID}`)
    if(!order){
        throw new Error(`order ${ID} ID not found`)
    }
    res.send(order)
    } catch (error) {
    next(error)
    }
}


async function update(req,res,next){
    try {
    const ID = req.params.id
    const {productID,userID,addressID,deliveryTime,orderStatus,deliveryPrice} = req.body
    const [[orderID]] = await pool.query(`select * from order where ID = ${ID}`)
    if(!orderID){
        throw new Error(`order ${ID} ID not found`)
    }
    const order = {
        productID: productID === null ? null : productID || orderID.productID,
        userID: userID === null ? null : userID || orderID.userID,
        addressID: addressID === null ? null : addressID || orderID.addressID,
        deliveryTime: deliveryTime === null ? null : deliveryTime || orderID.deliveryTime,
        orderStatus: orderStatus === null ? null : orderStatus || orderID.orderStatus,
        deliveryPrice: deliveryPrice === null ? null : deliveryPrice || orderID.deliveryPrice
    }
    const query = `update order set ? where ID = ${ID}`
    await pool.query(query,order)
    res.send('bingo')
    } catch (error) {
    next(error)
    }
}


async function remove(req,res,next){
    try {
    const ID = req.params.id
    const [[order]] = await pool.query(`select * from order where ID = ${ID}`)
    if(!order){
        throw new Error(`order ${ID} ID not found`)
    }
    await pool.query(`delete from order where ID = ${ID}`)
    res.send('bingo')
    } catch (error) {
    next(error)
    }
}


module.exports = {post,findAll,get,update,remove}