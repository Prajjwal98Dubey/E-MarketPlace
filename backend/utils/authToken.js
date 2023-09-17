
const jwt = require('jsonwebtoken')

const authToken=(user)=>{
  token =  jwt.sign({
    _id:user._id,
    name:user.name,
    email:user.email
  },process.env.JWT_SECRET_KEY)

  return token
}

module.exports =  authToken