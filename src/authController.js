const express = require('express')
const bcrypt = require('bcrypt')
const jswebtoken =  
const users = require('./src/models/usersModel')
const Sign_In = async (req, res)=>{
  try{
    const { Name, Username, Password, email } = req.body;
    if( !Name || !Username || !Password || !email ){
      return res.status().json({ success: false, message: 'All fields must be filled' })
    }
    presentU = await users.find({ Username })
    presentE = await users.find({ email })
    if( presentU ){
      return res.status().json({ success: false, message: 'Username already taken'})
    }
    if( presentE ){
      return res.status().json({ success: false, message: 'Email already exists' })
    }
    const hashedPass = bcrypt.hash( Password, 10)
    await users.create({ Name, Username, hashedPass, email })
    res.status().json({ success: false, message: 'Registered successfully'})
  }catch(err){
    res.status(500).json({ success: false, message: 'Server error'})
    console.error(err)
  }
}
const Log_In = (req, res)=>{
  try{
    const { Username, Password } = req.body;
