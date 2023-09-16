const pool = require('../db/db.config')
const bcrypt = require('bcrypt')
const Pagination = require('../utils/pagination')


async function post(req,res,next) {
    try {
    var {name,phone,image,region,role,hashedPassword} = req.body
    hashedPassword = await bcrypt.hash(hashedPassword,5)
    const user = {name,phone,image,region,role,hashedPassword}
    const query = 'insert into user set ?'
    await pool.query(query,user)
    res.send('bingo')
    } catch (error) {
    next(error)
    }
}


async function get(req,res,next) {
    try {
        const ID = req.params.id
        const [[user]] = await pool.query(`select * from user where ID = ${ID}`)
        if(!user){
            throw new Error(`user ${ID} ID not found`)
        }
        res.send(user)
    } catch (error) {
        next(error)
    }
}


async function put(req,res,next) {
    try {
        const ID = req.params.id
        const [[userID]] = await pool.query(`select * from user where ID = ${ID}`)
        if(userID == undefined){
            throw new Error (`user ${ID} ID not found`)
        }
        const {name,phone,image,region,role,hashedPassword} = req.body
        const user = {
            name: name === null ? null : name || userID.name,
            phone: phone === null ? null : phone || userID.phone,
            image: image === null ? null : image || userID.image,
            region: region === null ? null : region || userID.region,
            role: role === null ? null : role || userID.role,
            hashedPassword: hashedPassword === null ? null : await bcrypt.hash(hashedPassword,5) || userID.hashedPassword
        }
        const update = (`update user set ? where ID = ${ID}`)
        await pool.query(update,user)
        res.send('bingo')
    } catch (error) {
        next(error)
    }
}


async function remove(req,res,next) {
    try {
        const ID = req.params.id
        const [[user]] = await pool.query(`select * from user where ID = ${ID}`)
        if(user == undefined){
            throw new Error (`user ${ID} ID not found`)
        }
        await pool.query(`delete from user where ID = ${ID}`)
        res.send('bingo')
    } catch (error) {
        next(error)
    }
}


module.exports = {post,get,put,remove}