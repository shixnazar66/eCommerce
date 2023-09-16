const pool = require('../db/db.config')
const Pagination = require('../utils/pagination')


async function post(req,res,next){
    try {
    const {name} = req.body
    const params = {name}
    const query = "insert into attributevalue set ? "
    await pool.query(query,params)
    res.send('bingo')
    } catch (error) {
    next(error)
    }
}


async function findALL(req,res,next){
    try {
    const {page, paginationLimit} = req.query
    const [data] = await pool.query('select * from attributevalue')
    if(data[0].ID == undefined){
      throw new Error('attributevalue ID not found')
    }
    const find = new Pagination(page, paginationLimit, data.length)
    const [attributevalue] = await pool.query(`select * from attributevalue LIMIT ${find.limit} OFFSET ${find.offset}`)
    res.send({data:attributevalue, Pagination:find})
    } catch (error) {
    next(error)
    }
}


async function get(req,res,next){
    try {
    const ID = req.params.id
    const [[attributevalue]] = await pool.query(`select * from attributevalue where ID = ${ID}`)
    if(!attributevalue){
        throw new Error(`attributevalue ${ID} ID not found`)
    }
    res.send(attributevalue)
    } catch (error) {
    next(error)
    }
}


async function update(req,res,next){
    try {
    const ID = req.params.id
    const {name} = req.body
    const [[attributevalueID]] = await pool.query(`select * from attributevalue where ID = ${ID}`)
    if(!attributevalueID){
        throw new Error(`attributevalue ${ID} ID not found`)
    }
    const attributevalue = {name: name === null ? null : name || attributevalueID.name}
    const query = `update attributevalue set ? where ID = ${ID}`
    await pool.query(query,attributevalue)
    res.send('bingo')
    } catch (error) {
    next(error)
    }
}


async function remove(req,res,next){
    try {
    const ID = req.params.id
    const [[attributevalue]] = await pool.query(`select * from attributevalue where ID = ${ID}`)
    if(!attributevalue){
        throw new Error(`attributevalue ${ID} ID not found`)
    }
    await pool.query(`delete from attributevalue where ID = ${ID}`)
    res.send('bingo')
    } catch (error) {
    next(error)
    }
}


module.exports = {post,findALL,get,update,remove}