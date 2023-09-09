const express = require('express')
const app = express()
require('dotenv').config()
const Stripe=require('stripe')
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
app.delete('/new/delete/:id',async(req,res)=>{
    const result = await home.findByIdAndDelete(req.params.id)
    res.json(result)
})
const Products = require('./models/products')
app.get('/products', async (req, res) => {
    const product = await Products.find()
    res.json(product)
})
app.post('/new-products', async (req, res) => {
    const product = await  new Products({
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
app.delete('/product/delete/:id',async(req,res)=>{
    const product = await Products.findByIdAndDelete(req.params.id)
    res.json(product)
})
app.post('/create-checkout-session', async (req, res) => {
    const line_items=req.body.items.map((item)=>{
        return {
            price_data:{
                currency:'INR',
                product_data:{
                    name:item.name,
                    image:[item.images]
                },
                unit_amount:item.price*100
              },
              quantity:item.Quantity,

        }
    })
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: 'payment',
      success_url: 'http://localhost:3000/success-payment',
      cancel_url: 'http://localhost:3000/failure-payment',
    });
  
    res.send({url:session.url});
  });
start()