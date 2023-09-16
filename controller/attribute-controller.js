const pool = require('../db/db.config')
const Pagination = require('../utils/pagination')


async function post(req,res,next){
    try {
    const {name} = req.body
    const params = {name}
    const query = "insert into attribute set ?"
    await pool.query(query,params)
    res.send('bingo')
    } catch (error) {
    next(error)
    }
}


async function findALL(req,res,next){
    try {
    const {page, paginationLimit, catID} = req.query
    const find = new Pagination(page, paginationLimit, data.length)
    let data;
    if(catID){
        const query = `select * from category_attribute ca\
        left join attribute a on ca.attribute_ID = a.ID\
        where ca.category_ID = ? LIMIT ${find.limit} OFFSET ${find.offset}`
        const [result] = await pool.query(query,catID)
        data = result
    }else{
        data = await pool.query('select * from attribute')
    }
    res.send({data,Pagination:find})
    } catch (error) {
    next(error)
    }
}


async function findALLgetby(req,res,next){
    try {
    const {page, paginationLimit,ID} = req.query
    const [[data]] = await pool.query(`select * from attributevalue where ID = ${ID}`)
    const find = new Pagination(page, paginationLimit,data.length )
    const [result] = await pool.query(`select * from attributevalue where attributeID = ${ID} LIMIT ${find.limit} OFFSET ${find.offset}`) 
    if(data.length == 0){
        throw new Error('attribute not found')
    }
    res.send({data:result,Pagination:find})
    } catch (error) {
    next(error)
    }
}


async function get(req,res,next){
    try {
    const ID = req.params.id
    const [[attribute]] = await pool.query(`select * from attribute where ID = ${ID}`)
    if(!attribute){
        throw new Error(`attribute ${ID} ID not found`)
    }
    res.send(attribute)
    } catch (error) {
    next(error)
    }
}


async function update(req,res,next){
    try {
    const id = req.params.id
    const {name} = req.body
    const [[attributeID]] = await pool.query(`select * from attribute where ID = ${id}`)
    if(!attributeID){
        throw new Error(`attribute ${id} ID not found`)
    }
    const attribute = {name: name === null ? null : name || attributeID.name}
    const query = (`update attribute set ? where ID = ${id}`)
    await pool.query(query,attribute)
    res.send('bingo')
    } catch (error) {
    next(error)
    }
}


async function remove(req,res,next){
    try {
    const ID = req.params.id
    const [[attribute]] = await pool.query(`select * from attribute where ID = ${ID}`)
    if(!attribute){
        throw new Error(`attribute ${ID} ID not found`)
    }
    await pool.query(`delete from attribute where ID = ${ID}`)
    res.send('bingo')
    } catch (error) {
    next(error)
    }
}


module.exports = {post,findALL,findALLgetby,get,update,remove}