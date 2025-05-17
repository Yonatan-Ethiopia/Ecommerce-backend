const express = require('express')
const history = require('./src/models/historyModel')
const getHistory = async ( req, res)=>{
 try{
  const userId = req.user
  const userHistory = await history.find({ user: userId })
  if(!userHistory){
    return res.status(404).json({ message: 'User doesn't have a history' })
  }
  res.status().json({ success: true, message: 'History is found', userHistory })
 }catch(err){
   res.status(500).json({ success: true, message: 'Server error'})
 }
}
module.exports = getHistory;
