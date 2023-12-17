export const conversionToStripeArray=(products)=>{
    const items = []
    products.map((prod)=>(
        items.push({
            _id:prod.product[0]._id,
            name:prod.product[0].name,
            price:prod.product[0].price,
            image:prod.product[0].image,
            Quantity:prod.quantity
        })
    ))
    return items
}       