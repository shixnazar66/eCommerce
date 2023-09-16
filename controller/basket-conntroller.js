const pool = require('../db/db.config')
const Pagination = require('../utils/pagination')


async function post(req,res,next){
    try {
    const {productID,userID,count} = req.body
    if(!productID || !userID){
        throw new Error(`productID or userID not found`)
    }
    const params = {productID,userID,count}
    const [[product]] = await pool.query(`select * from product where ID = ${productID}`)
    const [[user]] = await pool.query(`select * from user where ID = ${userID}`)
    if(!product || !user){
        throw new Error('product or user not found')
    }
    const query = 'insert into basket set ?'
    await pool.query(query,params)
    res.send('bingo')
    } catch (error) {
    next(error)
    }
}


async function get(req,res,next){
    try {
    const ID = req.params.id
    const [[basket]] = await pool.query(`select * from basket where ID = ${ID}`)
    if(!basket){
        throw new Error(`basket ${ID} ID not found`)
    }
    res.send(basket)
    } catch (error) {
    next(error)
    }
}


async function update(req,res,next){
    try {
    const ID = req.params.id
     const basketID = await pool.query(`select * from basket where ID = ${ID}`)
    if(!basketID){
        throw new Error(`basket ${ID} ID not found`)
    }
    const {productID,userID,count} = req.body
    const basket = {
        productID: productID === null ? null : productID || basketID.productID,
        userID: userID === null ? null : userID || productID.userID,
        count: count === null ? null : count || productID.count
    }
    const query = `update basket set ? where ID = ${ID}`
    await pool.query(query,basket)
    res.send('bingo')
    } catch (error) {
    next(error)
    }
}


async function remove(req,res,next){
    try {
    const ID = req.params.id
    const [[basket]] = await pool.query(`select * from basket where ID = ${ID}`)
    if(!basket){
        throw new Error(`basket ${ID} ID not found`)
    }
    await pool.query(`delete from basket where ID = ${ID}`)
    res.send('bingo')
    } catch (error) {
    next(error)
    }
}


module.exports = {post,get,update,remove}