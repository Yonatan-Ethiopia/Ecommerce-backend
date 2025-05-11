const express = require('express')
const bcrypt = require('bcrypt')
const jwt =  require('jsonwebtoken')
const users = require('./src/models/usersModel')
const Sign_In = async (req, res)=>{
  try{
    const { Name, Username, Password, email } = req.body;
    if( !Name || !Username || !Password || !email ){
      return res.status().json({ success: false, message: 'All fields must be filled' })
    }
    presentU = await users.find({ u=> u.Username === Username})
    presentE = await users.find({ u=> u.email === email })
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
const Log_In = async (req, res)=>{
  try{
    const { Username, Password } = req.body;
    if( !Username || !password){
      return res.status().json({ success: false, message: 'Missing form' })
    }
    const isUser = await users.findOne({ username: Username });
    if( !isUser ){
      return res.status(404).json({ success: false, message: "User doesn't exist" })
      }
    const matchPass = bcrypt.compare( bcrypt.hash(Password, 10), isUser.Password )
    if( !matchPass ) {
      return res.status().json({ success: false, message: "Password doesn't match" })
    }
    if(!process.env.JWT_TOKEN){ 
      console.log('Empty JWT_TOKEN in .env')
      return res.status().json({ success: false, message: " Error while generating token" }
    }
    const token = jwt.sign( userId: isUser._id, password: bcrypt.hash(Password, 10), process.env.JWT_TOKEN})
    res.status().json({ success: true, message: 'Log in successfull' , token})
  }catch(err){
    res.status(500).json({ success: false, message: 'Server error' })
    console.error(err)
  }
}
module.exports = { Sign_In, Log_In }
