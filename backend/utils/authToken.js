
const jwt = require('jsonwebtoken')

const authToken=(id)=>{
  token =  jwt.sign({id},process.env.JWT_SECRET_KEY)

  return token
}

module.exports =  authToken