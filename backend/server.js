const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
require('dotenv').config()
const Stripe = require('stripe')
const stripe = Stripe(process.env.STRIPE_KEY)
const cors = require('cors')
const mongoose = require('mongoose')
app.use(express.json())
app.use(cors())
const start = async () => {
    await mongoose.connect(process.env.CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => console.log("DB connected")).catch(console.error)
    await app.listen(5001, () => console.log("App Started at 5001🚀"))
}

const home = require('./models/homepage')
app.get('/', async (req, res) => {
    const homeItems = await home.find()
    res.json(homeItems)
})
app.post('/new', async (req, res) => {
    const homeItem = new home({
        category: req.body.category,
        categoryImg: req.body.categoryImg
    })
    homeItem.save()
    res.json(homeItem)
})
app.put('/new/:id', async (req, res) => {
    const category = await home.findById(req.params.id)
    category.categoryImg = req.body.categoryImg
    category.save()
    res.json(category)
})
app.delete('/new/delete/:id', async (req, res) => {
    const result = await home.findByIdAndDelete(req.params.id)
    res.json(result)
})
const Products = require('./models/products')
app.get('/products', async (req, res) => {
    const product = await Products.find()
    res.json(product)
})
app.post('/new-products', async (req, res) => {
    const product = await new Products({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        brand: req.body.brand,
        category: req.body.category,
        image: req.body.image,
        ratings: req.body.ratings
    })
    product.save()
    res.json(product)
})
app.delete('/product/delete/:id', async (req, res) => {
    const product = await Products.findByIdAndDelete(req.params.id)
    res.json(product)
})

const User = require('./models/user')
const authToken = require('./utils/authToken')
const { protect } = require('./utils/authMiddleware')
const { orderDetails, showOrders, removeFromProducts, removeFromMyCart, calculateTotalAmount, copyProductFromCartToUser } = require('./Controllers/orderControllers')
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body
    const check_email = await User.findOne({ email: email })
    if (check_email) {
        res.send("User already exists")
    }
    else {
        const salt = await bcrypt.genSalt(10)
        const newPassword = await bcrypt.hash(password, salt)
        const user = await User.create({
            name: name,
            email: email,
            password: newPassword
        })
        user.save()
        res.json({
            _id: user._id,
            email: user.email,
            token: authToken(user._id)
        })
    }
})
app.post('/login', async (req, res) => {
    const { email, password } = req.body
    const data = await User.findOne({ email: email })
    if (!data) {
        res.send("User does not exits")
    }
    else if (!await bcrypt.compare(password, data.password)) {
        res.send("Invalid email or password")
    }
    else {
        res.json({
            email: email,
            token: authToken(data._id)
        })
    }

})

app.post('/addProducts', protect, orderDetails)
app.post('/showOrders', protect, showOrders)
app.post('/removeProduct', protect, removeFromProducts)
app.delete('/removeFromCart/:token/:id', protect, removeFromMyCart)
app.post('/totalCartAmount', protect, calculateTotalAmount)
app.post('/copyFromCartToUser', protect, copyProductFromCartToUser)

app.post('/create-checkout-session', async (req, res) => {
    console.log(req.body)
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: "payment",
            line_items: req.body.items.map(item => {
                return {
                    price_data: {
                        currency: "inr",
                        product_data: {
                            name: item.name,
                            image: [item.images]
                        },
                        unit_amount: item.price * 100
                    },
                    quantity: item.Quantity ? item.Quantity : item.quantity
                }
            }),
            success_url: 'http://localhost:3000/success-payment',
            cancel_url: 'http://localhost:3000/failure-payment'

        })
        res.send({ url: session.url })
    }
    catch (error) {
        res.json({ error: error.message })
    }

});
start()