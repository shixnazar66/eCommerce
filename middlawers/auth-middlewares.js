const jwt = require('jsonwebtoken');
require('dotenv').config()
const pool = require('../db/db.config.js');
const express = require('express');


async function authMidleware(req,res,next){
  try {
    const token = req.headers?.authorization?.split(' ')[1]
    if(!token){
    throw new Error('Jwt must be provided')
    }
    const accessSecret = process.env.USER_ACCES_TOKEN_SECRET
    const decryptedToken = jwt.verify(token,accessSecret)
    req.role = decryptedToken.role
    req.ID = decryptedToken.ID
    const [[user]] = await pool.query(`select * from user where ID='${decryptedToken.ID}'`)
    if(user.hashedRefreshtoken === null){
      throw new Error('accestoken not found')
    }
    next()
  } catch (error) {
    next(error)
  }
}



module.exports = authMidleware

