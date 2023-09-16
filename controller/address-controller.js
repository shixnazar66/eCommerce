const pool = require('../db/db.config')
const Pagination = require('../utils/pagination')


async function post(req,res,next){
    try {
    const {userID,region,referencePoint,street,house,room} = req.body
    const [[userid]] = await pool.query(`select ID from user where ID = ${userID}`)
    if(!userid){
    throw new Error('user not found')
    }
    const address = {userID,region,referencePoint,street,house,room}
    const query = ("insert into address set ?")
    await pool.query(query,address)
    res.send('bingo')
    } catch (error) {
    next(error)
    }
}


async function findALL(req,res,next){
    try {
    const {page, paginationLimit} = req.query
    const [data] = await pool.query('select * from address')
    if(data[0].ID == undefined){
    throw new Error('address ID not found')
    }
    const find = new Pagination(page, paginationLimit, data.length)
    const [address] = await pool.query(`select * from address LIMIT ${find.limit} OFFSET ${find.offset}`)
    res.send({data:address, Pagination:find})
    } catch (error) {
    next(error)
    }
}


async function get(req,res,next){
    try {
    const ID = req.params.id
    const [[address]] = await pool.query(`select address.ID, address.userID, user.name, user.phone, address.region, address.street, address.house 
    from address inner join user on address.userID = user.ID where user.ID = ${ID}`)
    if(address == undefined){
    throw new Error(`address ${ID} ID not found`)
    }
    res.send(address)
    } catch (error) {
    next(error)
    }
}


async function put(req,res,next){
    try {
    const id = req.params.id
    const [[addressID]] = await pool.query(`select * from address where ID = ${id}`)
    if(addressID == undefined){
        throw new Error(`addres ${id} ID not found`)
    }
    const {ID,userID,region,referencePoint,street,house,room} = req.body
    const address = {
        ID: ID === null ? null : ID || addressID.ID,
        userID: userID === null ? null : userID || addressID.userID,
        region: region === null ? null : region || addressID.region,
        referencePoint: referencePoint === null ? null : referencePoint || addressID.referencePoint,
        street: street === null ? null : street || addressID.street,
        house: house === null ? null : house || addressID.house,
        room: room === null ? null : room || addressID.room
    }
    const query = (`update address set ? where ID = ${id}`)
    await pool.query(query,address)
    res.send('bingo')
    } catch (error) {
    next(error)
    }
}


async function remove(req,res,next){
    try {
    const ID = req.params.id
    const [[addressID]] = await pool.query(`select * from address where ID = ${ID}`)
    if(addressID == undefined){
        throw new Error(`address ${ID} not found`)
    }
    await pool.query(`delete from address where ID = ${ID}`)
    res.send('bingo')
    } catch (error) {
    next(error)
    }
}


module.exports = {post,findALL,get,put,remove}