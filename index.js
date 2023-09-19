const express = require('express')
const app = express()
const multer = require('multer')
const {config} = require('dotenv')
const productRoute = require('./routers/product-route')
const categoryRoute = require('./routers/category-route')
const authRoute = require('./routers/auth-route')
const userRoute = require('./routers/user.route')
const addressRoute = require('./routers/address-route')
const attributeRoute = require('./routers/attribute-route')
const attributevalueRoute = require('./routers/attributevalue-route')
const basketRoute = require('./routers/basket-route')
const favoriteRoute = require('./routers/favorite-route')
const orderRoute = require('./routers/order-route')
const ApiResponse = require('./utils/response')
const jwt = require('jsonwebtoken')
const pool = require('./db/db.config.js')
const bcrypt = require('bcrypt')
config()


const port = process .env.PORT || 4000


app.use(express.json())
app.use('/address',addressRoute)
app.use('/auth',authRoute)
app.use('/product',productRoute)
app.use('/category',categoryRoute)
app.use('/user',userRoute)
app.use('/attribute',attributeRoute)
app.use('/attributevalue',attributevalueRoute)
app.use('/basket',basketRoute)
app.use('/favorite',favoriteRoute)
app.use('/order',orderRoute)


app.post('/search',(req,res)=>{
 const {query} = req
 res.send(query)
})


app.use(function (err, req, res, next) {
    res.send(new ApiResponse(null,null,err.message));
});



const storage = multer.diskStorage({
destination: function (req, file, cb) {
cb(null, '/uploads')
},
filename: function (req, file, cb) {
cb(null, file.originalname)
  }
})

const  upload = multer({dest:'uploads/'})
const cpUpload = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])

app.post("/media",upload.array('photos',12),(req,res)=>{
  const url = []
  for( i in req.files){
    url.push(req.files[i].path)
  }
  res.send(url)
})

app.use("/uploads",express.static("./uploads"))


app.get('/',(req,res)=>res.send('Home address. GET method'))
app.post('/',(req,res)=>res.send('Home address. Post method'))
app.put('/',(req,res)=>res.send('Home address. PUT method'))
app.delete('/',(req,res)=>res.send('Home address. DELETE method'))





app.listen(port, ()=>console.log(`server listening on localhost: ${port}`))