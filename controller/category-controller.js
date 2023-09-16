const pool = require('../db/db.config')
const Pagination = require('../utils/pagination.js');


async function post(req, res, next) {
    try {
        const { nameUZ, nameRU, descUZ, descRU, images, parentCategoryID } = req.body
        const params = { nameUZ, nameRU, descUZ, descRU, images, parentCategoryID }
        if (parentCategoryID) {
            const [[category]] = await pool.query(`select * from category where ID = ?`, parentCategoryID)
            if (!category) {
                res.statusCode = 404
                throw new Error(`category with ID ${parentCategoryID} not found `)
            }
        }
        const query = 'insert into category set ?'
        await pool.query(query, params)
        res.send('bingo')
    } catch (error) {
       next(error)
    }
}


async function findAll(req, res, next) {
    try {
        const { page, paginationLimit } = req.query
        const [data] = await pool.query('select * from category')
        if(data[0].ID == undefined){
            throw new Error(`category ID not found`)
        }
        const find = new Pagination(page, paginationLimit,data.length)
        const [category] = await pool.query(`select * from category LIMIT ${find.limit} OFFSET ${find.offset}`)
        res.send({data:category,Pagination:find})
    } catch (error) {
       next(error)
    }
}


async function getById(req, res, next) {
    try {
        const ID = req.params.id
        const [[category]] = await pool.query(`select * from category where ID = ${ID}`)
        if (!category) {
            throw new Error(`category ${ID} not found`)
        }
        res.send(category)
    } catch (error) {
        next(error)
    }
}


async function put(req, res, next) {
 try {
    const ID = req.params.id
    const [[categoryID]] = await pool.query(`select * from category where ID = '${ID}'`)
    if (categoryID == undefined) {
        throw new Error(`category ${ID} ID not found`)
    }
    const { nameUZ, nameRU, descUZ, descRU, images } = req.body
    const category = {
        nameUZ: nameUZ === null ? null : nameUZ || categoryID.nameUZ, 
        nameRU: nameRU === null ? null : nameRU || categoryID.nameRU,
        descUZ: descUZ === null ? null : descUZ || categoryID.descUZ,
        descRU: descRU === null ? null : descRU || categoryID.descRU,
        images: images === null ? null : images || categoryID.images
      }
    const update = (`update category set ? where ID = ${ID}`)
    await pool.query(update, category)
    res.send('bingo')
    } catch (error) {
    next(error)
    }
}


async function remove(req, res, next) {
    try {
     const ID = req.params.id
     const [[categoryID]] = await pool.query(`select * from category where ID = ${ID}`)
     if(!categoryID){
        throw new Error(`category ${ID} ID not found`)
     }
     await pool.query(`delete from category where ID = ${ID}`)
     res.send('bingo')
    } catch (error) {
   next(error)
    }
}


module.exports = { post, findAll, getById, put, remove }


