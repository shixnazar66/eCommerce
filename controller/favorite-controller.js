const pool = require('../db/db.config')


async function post(req,res,next){
    try {
    const {productID,userID,count} = req.body
    if(!productID || !userID){
        throw new Error('not found')
    }
    const params = {productID,userID,count}
    const [[product]] = await pool.query(`select * from product where ID = ${productID}`)
    const [[user]] = await pool.query(`select * from user where ID = ${userID}`)
    if(!product || !user){
        throw new Error('product or user not found')
    }
    const query = 'insert into favorite set ?'
    await pool.query(query,params)
    res.send('bingo')
    } catch (error) {
    next(error)
    }
}

async function get(req,res,next){
    try {
    const ID = req.params.id
    const [[favorite]] = await pool.query(`select * from favorite where ID = ${ID}`)
    if(!favorite){
        throw new Error(`favorite ${ID} ID not found`)
    }
    res.send(favorite)
    } catch (error) {
    next(error)
    }
}


async function update(req,res,next){
    try {
    const ID = req.params.id
    const favoriteID = await pool.query(`select * from favorite where ID = ${ID}`)
    if(!favoriteID){
        throw new Error(`favorite ${ID} ID not found`)
    }
    const {productID,userID,count} = req.body
    const favorite = {
        productID: productID === null ? null : productID || favoriteID.productID,
        userID: userID === null ? null : userID || favoriteID.userID,
        count: count === null ? null : count || favoriteID.count
    }
    const query = `update favorite set ? where ID = ${ID}`
    await pool.query(query,favorite)
    res.send('bingo')
    } catch (error) {
    next(error)
    }
}


async function remove(req,res,next){
    try {
    const ID = req.params.id
    const [[favorite]] = await pool.query(`select * from favorite where ID = ${ID}`)
    if(!favorite){
        throw new Error(`favorite ${ID} ID not found`)
    }
    await pool.query(`delete from favorite where ID = ${ID}`)
    res.send('bingoo')
    } catch (error) {
    next(error)
    }
}


module.exports = {post,get,update,remove}