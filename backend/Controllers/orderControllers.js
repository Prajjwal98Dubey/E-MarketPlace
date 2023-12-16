const User = require('../models/user')
const Product = require('../models/products')
const Orders= require('../models/orders')
const jwt = require('jsonwebtoken')
const orderDetails = async (req, res) => {
    const { token, productId } = req.body
    const decodeId = jwt.decode(token).id
    const checkProductId = await Orders.findOne({user:decodeId,productId:productId})
    if (checkProductId){
        checkProductId.quantity+=1
        checkProductId.save()
        res.json(checkProductId)
        return
    }
    const product = await Product.find({_id:productId})
    const order = await Orders.create({
        user:decodeId,
        productId:productId,
        product:product
    })
    order.save()
    res.json(order)
}
const showOrders =async(req,res)=>{
    const {token} = req.body
    const userId  = jwt.decode(token).id
    const allProducts = await Orders.find({user:userId})
    res.json(allProducts)
}
const removeFromProducts = async(req,res)=>{
    const{token,productId} = req.body
    const decoded = jwt.decode(token).id
    const checkProduct = await Orders.findOne({user:decoded,productId:productId})
    console.log(checkProduct)
    checkProduct.quantity-=1
    checkProduct.save()
    res.json(checkProduct)
}

module.exports = { orderDetails,showOrders,removeFromProducts}