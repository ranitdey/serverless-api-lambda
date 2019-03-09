'use strict';

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
const Product= mongoose.model("Product",productSchema)
const mongoConnection= mongoose.connect("mongodb://localhost:27017/playground")  //hardcoded for now


module.exports.mongoInsert = async (event, context,callback) => {
 context.callbackWaitsForEmptyEventLoop=false;
 const connection = await mongoConnection
            .catch(()=>callback(new Error("Mongo connection failed"),null))
 const product =new Product(JSON.parse(event.body))
 const result= await product.save()
          .then((result)=>callback(null,{
              statusCode: 200,
              body : JSON.stringify(result)
          }))
          .catch(()=>callback(new Error("Mongo insertion failed"),null))
};



