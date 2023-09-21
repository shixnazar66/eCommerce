const pool = require('../db/db.config')
const Pagination = require('../utils/pagination')



async function post(req,res,next){
    try {
    const {comment,userID,productID,stars} = req.body
    const params = {comment,userID,productID,stars}
    const user = await pool.query(`select * from user where ID = ${ID}`)
    const product = await pool.query(`select * from product where ID = ${ID}`)
    if(!user || !product){
        throw new Error('not found')
    }
    const query = 'insert into review set ?'
    await pool.query(query,params)
    res.send('bingo')
    } catch (error) {
    next(error)
    }
}


async function findAll(req,res,next){
    try {
    const {page,paginationLimit} = req.query
    const [data] = await pool.query('select * from review')
    if(data[0].ID == undefined){
        throw new Error('review not found')
    }
    const find = new Pagination(page,paginationLimit,data.length)
    const review = await pool.query(`select * from review LIMIT ${find.limit} OFFSET ${find.offset}`)
    res.send({data:review,Pagination:find})
    } catch (error) {
    next(error)
    }
}


async function get(req,res,next){
    try {
    const ID = req.params.id
    const [[review]] = await pool.query(`select * from review where ID = ${ID}`)
    if(!review){
        throw new Error(`review ${ID} ID not found`)
    }
    res.send(review)
    } catch (error) {
    next(error)
    }
}


async function update(req,res,next){
    try {
    const ID = req.params.id
    const {comment,userID,productID,stars} = req.body
    const [[reviewID]] = await pool.query(`select * from review where ID = ${ID}`)
    if(!reviewID){
        throw new Error(`review ${ID} ID not found`)
    }
    const review = {
        comment: comment === null ? null : comment || reviewID.comment,
        userID: userID === null ? null :userID || reviewID.userID,
        productID: productID === null ? null : productID || reviewID.productID,
        stars: stars === null ? null : stars || reviewID.stars
    }
    const query = `update review set ? where ID = ${ID}`
    await pool.query(query,review)
    res.send('bingo')
    } catch (error) {
    next(error)
    }
}


async function remove(req,res,next){
    try {
    const ID = req.params.id
    const [[review]] = await pool.query(`select * from review where ID =${ID}`)
    if(!review){
        throw new Error(`review ${ID} ID not foound`)
    }
    await pool.query(`delete from review where ID = ${ID}`)
    res.send('bingo')
    } catch (error) {
    next(error)
    }
}


module.exports = {post,findAll,get,update,remove}