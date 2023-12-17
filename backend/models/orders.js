const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Products'
    },
    product:{
        type:Object,
        required:true
    },
    quantity:{
        type:Number,
        default:1
    },
    totalAmount:{
        type:Number,
        required:true
    }
})

module.exports = mongoose.model("Orders",orderSchema)