const jwt =  require('jsonwebtoken')
const User = require('../models/user')
const mongoose = require('mongoose')
const ObjectId= mongoose.Types._ObjectId
const protect = async(req,res,next)=>{
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token =  req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)
            // const UserId = new ObjectId(decoded.id)
            req.user =  await User.findById(decoded.id)
            next()
        } catch (error) {
            res.status(400).send(error)
        }
    }
    if (!token){
        res.status(400).send("Unauthorized Token")
    }
}

module.exports = {protect}