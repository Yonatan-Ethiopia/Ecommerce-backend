const express = require('express')
const history = require('./src/models/historyModel')
const getHistory = async ( req, res)=>{
  const userId = req.user
  const userHistory = await history.findById(userId)
  if(!userHistory){
    return res.status(404).json({ message: 'User doesn't have a history' })
  }
  res.status().json({ success: true, message: 'History is found', userHistory })
