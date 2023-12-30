const User = require('../models/user')
const Product = require('../models/products')
const Orders = require('../models/orders')
const historyOrder = require('../models/orderHIstory')
const jwt = require('jsonwebtoken')
const orderDetails = async (req, res) => {
    const { token, productId } = req.body
    const decodeId = jwt.decode(token).id
    const checkProductId = await Orders.findOne({ user: decodeId, productId: productId })
    const product = await Product.find({ _id: productId })
    if (checkProductId) {
        checkProductId.totalAmount += product[0].price
        checkProductId.quantity += 1
        checkProductId.save()
        res.json(checkProductId)
        return
    }
    const order = await Orders.create({
        user: decodeId,
        productId: productId,
        product: product,
        totalAmount: product[0].price
    })
    order.save()
    res.json(order)
}
const showOrders = async (req, res) => {
    const { token } = req.body
    const userId = jwt.decode(token).id
    const allProducts = await Orders.find({ user: userId })
    res.json({ allProducts })
}
const removeFromProducts = async (req, res) => {
    const { token, productId } = req.body
    const decoded = jwt.decode(token).id
    const checkProduct = await Orders.findOne({ user: decoded, productId: productId })
    // console.log(checkProduct)
    checkProduct.totalAmount -= checkProduct.product[0].price
    checkProduct.quantity -= 1
    checkProduct.save()
    res.json(checkProduct)
}
const removeFromMyCart = async (req, res) => {
    const { token, id } = req.params
    const userId = jwt.decode(token).id
    await Orders.findOneAndDelete({ user: userId, productId: id })
    res.json({ message: "product remove successfully." })
}
const calculateTotalAmount = async (req, res) => {
    const { token } = req.body
    const userId = jwt.decode(token).id
    const products = await Orders.find({ user: userId })
    let totalCartAmount = 0
    for (let i = 0; i < products.length; i++) {
        totalCartAmount += products[i].totalAmount
    }
    res.json({ totalCartAmount: totalCartAmount })
    return totalCartAmount
}
const copyProductFromCartToUser = async (req, res) => {
    const { token, productId, Quantity } = req.body
    const userId = jwt.decode(token).id
    const product = await Product.find({ _id: productId })
    const amount = Quantity * product[0].price
    const order = await Orders.create({
        user: userId,
        productId: productId,
        product: product,
        quantity: Quantity,
        totalAmount: amount
    })
    order.save()
    res.json({ order })
}
const myHistory = async (req, res) => {
    const { token, products } = req.body
    const userId = jwt.decode(token).id
    const myhistoryOrders = await historyOrder.create({
        user: userId,
        history: products
    })
    myhistoryOrders.save()
    res.json(myhistoryOrders)
}
const removeMyCurrentOrder = async (req, res) => {
    const { id } = req.params
    await Orders.deleteMany({ user: id })
    const myOrders = await Orders.find({ user: id })
}
const getMyOrderHistory = async (req, res) => {
    const { token } = req.body
    const userId = jwt.decode(token).id
    const previousOrders = await historyOrder.find({ user:userId })
    res.json(previousOrders)
}
const allProducts=async(req,res)=>{
    const skip = req.query.skip
    const limit = req.query.limit
    const products = await Product.find({})
    let newProducts=[]
    for(let i=parseInt(skip);i<parseInt(limit)+parseInt(skip);i++)
    {
        newProducts.push(products[i])
    }
    res.json(newProducts)
}

module.exports = { orderDetails, showOrders, removeFromProducts, removeFromMyCart, calculateTotalAmount, copyProductFromCartToUser, myHistory, removeMyCurrentOrder, getMyOrderHistory,allProducts}