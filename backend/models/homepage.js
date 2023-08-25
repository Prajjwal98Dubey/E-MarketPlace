const mongoose=require('mongoose')

const homeSchema=new mongoose.Schema({
    category:{
        type:String,
        required:true
    },
    categoryImg:{
        type:String,
        required:true
    }
})
module.exports=mongoose.model("Home",homeSchema)