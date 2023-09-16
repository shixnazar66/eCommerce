const express = require('express')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const authRoute = express.Router()
const pool = require('../db/db.config')
const bcrypt = require("bcrypt")
const authMidleware = require('../middlawers/auth-middlewares')




authRoute.post('/register', async(req,res,next)=>{
  try {
    const {name,phone,password} = req.body 
    const [[name_]] = await pool.query (`select name from user where name='${name}'`)
    if(name_){
    throw new Error (`already name ${name}`)
    }
    const [[phone_]] = await pool.query(`select phone from user where phone='${phone}'`)
    if(phone_){
    throw new Error (`already phone ${phone}`)
    }
    const hashedPassword = await bcrypt.hash(password,5)
    pool.query(`insert into user (name,phone,hashedPassword,role) values ("${name}","${phone}","${hashedPassword}","admin")`)
    res.json({succes:'bingo'})
  } catch (error) {
    next(error)
  }
})


authRoute.post('/login', async(req,res,next)=>{
  try{
  const {phone,password} = req.body
  const [[user]] = await pool.query(`select * from user WHERE phone='${phone}'`)
  if(user == undefined){
  throw new Error('wrong phone')
  }
  const ID = user.ID
  const role = user.role
  const hashedPassword = user.hashedPassword
  if(!bcrypt.compareSync(password,hashedPassword)){
    throw new Error('wrong password')
  }
  const accesTokenSecret = process.env.USER_ACCES_TOKEN_SECRET
  const refreshTokenSecret = process.env.USER_REFRESH_TOKEN_SECRET
  const accesToken = jwt.sign({role:role,ID},accesTokenSecret,{expiresIn: '1d'})
  const refreshToken = jwt.sign({role:role,ID},refreshTokenSecret,{expiresIn: '1d'})
  await pool.query(`update user set hashedRefreshtoken='${await bcrypt.hash(refreshToken,5)}' where phone='${phone}'`)
  res.json({succes: true, error: null, data: {accesToken, refreshToken}})
  }catch(error){
  next(error)
  }
})


authRoute.post('/refresh',async(req,res,next)=>{
  try {
    const refreshToken = req.body.refreshtoken
    const accesTokenSecret = process.env.USER_ACCES_TOKEN_SECRET
    const refreshTokenSecret = process.env.USER_REFRESH_TOKEN_SECRET
    const {name,role} = jwt.verify(refreshToken,refreshTokenSecret)
    const newaccesToken = jwt.sign({name,role},accesTokenSecret,{expiresIn:"1d"})
    const newrefreshToken = jwt.sign({name,role},refreshTokenSecret,{expiresIn:"1d"})
    await pool.query(`update user set hashedRefreshtoken='${await bcrypt.hash(newrefreshToken,5)}'`)
    res.json({newaccesToken,newrefreshToken})
  } catch (error) {
    next(error)
  }
})


authRoute.delete('/log-out',authMidleware,async(req,res,next)=>{
  try {
  const ID = req.ID
  await pool.query(`update user set hashedRefreshtoken = NULL where ID="${ID}"`)
  res.json('bingo')
  } catch (error) {
  next(error)
  }
})


module.exports = authRoute
