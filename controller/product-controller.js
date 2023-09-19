const pool = require('../db/db.config')
const Pagination = require('../utils/pagination')


async function post(req,res,next){
    try {
    const {nameUZ,nameRU,images,categoryID,descSHORTUZ,descSHORTRU,descUZ,descRU,price,
    isPopular,viewCount,favoriteCount,orderCount,cartCount,discount,createdAT,updateAT} = req.body
    const [[categoryid]] = await pool.query(`select * from category where ID = ${categoryID}`)
    if(!categoryid){
      throw new Error(`category ${categoryID} not found`)
    }
    const params = {nameUZ,nameRU,images,categoryID,descSHORTUZ,descSHORTRU,descUZ,descRU,price,
    isPopular,viewCount,favoriteCount,orderCount,cartCount,discount,createdAT,updateAT}
    const query = 'insert into product set ?'
    await pool.query(query,params)
    res.send('bingo')
    } catch (error) {
    next(error)
    }
}


async function findAll(req, res, next) {
  try {
    const {page, paginationLimit, catID, attributeValue} = req.query
    let data
    let verify
    if (catID && attributeValue) {
      const [items] = await pool.query(`SELECT * FROM product p JOIN attribute at JOIN category ca JOIN category_product cap ON ca.ID = cap.product_ID AND at.ID='${attributeValue}' WHERE cap.category_ID = '${catID}'`)
      verify = new Pagination(page, paginationLimit, items.length)
      data = await pool.query(`SELECT * FROM product p JOIN attribute at JOIN category ca JOIN category_product cap ON ca.ID = cap.product_ID AND at.ID='${attributeValue}' WHERE cap.category_ID = '${catID}'  LIMIT ${verify.limit} OFFSET ${verify.offset}`)
    } else if (catID) {
      const [items] = await pool.query(`SELECT * FROM product WHERE ID = '${catID}'`)
      verify = new Pagination(page,paginationLimit,items.length)
      data = await pool.query(`SELECT * FROM product p JOIN category ca JOIN category_product cap ON ca.ID = cap.product_ID WHERE categoryID = '${catID}'  LIMIT ${verify.limit} OFFSET ${verify.offset}`)
    } else if (attributeValue) {
      const [items] = await pool.query(`SELECT * FROM product p JOIN attributevalue av JOIN product_attributevalue pav WHERE av.ID = pav.attributeValue_ID AND av.name='${attributeValue}'`)
      verify = new Pagination(page,paginationLimit,items.length)
      data = await pool.query(`SELECT * FROM product p JOIN attributevalue av JOIN product_attributevalue pav WHERE av.ID = pav.attributeValue_ID AND av.name='${attributeValue}' LIMIT ${verify.limit} OFFSET ${verify.offset}`)
    } else {
      const data = await pool.query(`SELECT * FROM product`)
      verify = new Pagination(page,paginationLimit,data[0].length)
      const [result] = await pool.query(`SELECT * FROM product LIMIT '${verify.limit}' OFFSET '${verify.offset}'`)
      if (result.length == 0) {
        throw new Error('RODUCT NOT FOUND')
      }
    }
    const [result] = data;
    res.send({ result, pagination: verify })
  } catch (error) {
    next(error);
  }
}


async function get(req,res,next){
    try {
    const ID = req.params.id
    const [[product]] = await pool.query(`select * from product where ID = ${ID}`)
    if(!product){
        throw new Error(`product ${ID} ID not found`)
    }
    let viewCount = product.viewCount
    if(product){
        viewCount += 1
        await pool.query(`update product set viewCount = ${viewCount} where ID = ${ID}`)
    }
    res.send(product)
    } catch (error) {
    next(error) 
    }
}


async function put(req,res,next){
    try {
    const ID = req.params.id
    const [[productID]] = await pool.query(`select * from product where ID = '${ID}'`)
    if (!productID) {
        throw new Error(`product ${ID} ID not found`)
    }
    const {nameUZ,nameRU,images,categoryID,descSHORTUZ,descSHORTRU,descUZ,descRU,price,
    isPopular,viewCount,favoriteCount,orderCount,cartCount,discount,createdAT,updateAT} = req.body
    const product = {
        nameUZ: nameUZ === null ? null : nameUZ || productID.nameUZ, 
        nameRU: nameRU === null ? null : nameRU || productID.nameRU,
        images: images === null ? null : images || productID.images,
        categoryID: categoryID === null ? null : categoryID || productID.categoryID,
        descSHORTUZ: descSHORTUZ === null ? null : descSHORTUZ || productID.descSHORTUZ,
        descSHORTRU: descSHORTRU === null ? null : descSHORTRU || productID.descSHORTRU,
        descUZ: descUZ === null ? null : descUZ || productID.descUZ,
        descRu: descRU === null ? null : descRU || productID.descRU,
        price: price === null ? null : price || productID.price,
        isPopular: isPopular === null ? null : isPopular || productID.isPopular,
        viewCount: viewCount === null ? null : viewCount || productID.viewCount,
        favoriteCount: favoriteCount === null ? null : favoriteCount || productID.favoriteCount,
        orderCount: orderCount === null ? null : orderCount || productID.orderCount,
        cartCount: cartCount === null ? null : cartCount || productID.cartCount,
        discount: discount === null ? null : discount || productID.discount,
        createdAT: createdAT === null ? null : createdAT || productID.createdAT,
        updateAT: updateAT === null ? null : updateAT || productID.updateAT,
      }
    const update = (`update product set ? where ID = ${ID}`)
    await pool.query(update, product)
    res.send('bingo')
    } catch (error) {
    next(error)
    }
}


async function remove(req,res,next){
    try {
    const ID = req.params.id
    const [[productID]] = await pool.query(`select * from product where ID = ${ID}`)
    if(!productID){
        throw new Error(`product ${ID} ID not found`)
    }
    await pool.query(`delete from product where ID = ${ID}`)
    res.send('bingo')
    } catch (error) {
    next(error)
    }
}



module.exports = {post, findAll, get, put, remove}