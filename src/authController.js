const express = require('express')
const bycrpt = require('bycrpt-hash')
const users = require('./src/models/usersModel')
const Sign_In = (req, res)=>{
  let { Name, Username, Password, email } = req.body;
  if( !Name || !Username || !Password || !email ){
    return res.status().json({ success: false, message: 'All fields must be filled' })
  }
  Password = bycrpt(
