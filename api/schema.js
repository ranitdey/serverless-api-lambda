const mongoose= require("mongoose")
const productSchema= new mongoose.Schema({
  name :{
    type:String,
    required:[true,"name is required"]
  },
  description :{
    type:String,
    required:[true,"nadescriptionme is required"]
  },
  price:{
    type: Number,
    required:[true,"price is required"]
  },
  ispublished : {
    type: Boolean,
    required:[true,"ispublished is required"]
  }
})
module.exports=productSchema