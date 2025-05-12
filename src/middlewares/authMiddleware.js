const jwt = require('jsonwebtoken')
const blacklist = require('./src/blacklists')
const verify = async (req, res, next)=>{
  const auth = req.header[ 'authorization' ]
  if(!auth){
    return res.status().json({ success: false, message: 'Token not found' })
  }
  const token = auth.split([''], 1)
  if(!token){
    return res.status().json({ success: false, message: 'Invalid token' })
  }
  const isBlackList = await blacklist.find( token )
  if(isBlackList){
    return res.status().json({ success: false, message: 'Token is in blacklist' })
  }
  if(!process.env.JWT_SECRET){
    return res.status().json({ success: false, message: 'Secret token empty' })
  }
  const is Verify = jwt.verify( process.env.JWT_SECRET, token)
