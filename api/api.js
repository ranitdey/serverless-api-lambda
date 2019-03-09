'use strict';
const mongoose= require("mongoose")
const productSchema= require("./schema")
const Product= mongoose.model("Product",productSchema)
const mongoConnection= mongoose.connect("mongodb://localhost:27017/playground")  //hardcoded for now
const validateSchema = require("./schemaValidation")

module.exports.mongoInsert = async (event, context,callback) => {
 context.callbackWaitsForEmptyEventLoop=false;
 const checkSchema= validateSchema.validate(JSON.parse(event.body),"post")
 if(checkSchema.error===null)
 {
    const connection = await mongoConnection
        .catch(()=>callback(new Error("Mongo connection failed"),null))
    const product =new Product(JSON.parse(event.body))
    const result= await product.save()
        .then((result)=>callback(null,{
              statusCode: 200,
              body : JSON.stringify(result)  
            }))
        .catch(()=>callback(new Error("Mongo insertion failed"),null))
 }
 else{
   callback(null,{
     statusCode : 400,
     body: "Bad request"
   })
 }
};


module.exports.mongoGetAll=async (event, context, callback)=>{
  context.callbackWaitsForEmptyEventLoop=false;
  const connection =await mongoConnection
                            .catch(()=>callback(new Error("Mongo connection failed"),null))
  const result = await Product.find().limit(6)                                                 //hardcoded limit for now
                    .catch(()=>callback(new Error("Mongo query failed"),null))
  callback(null,{
    statusCode: 200,
    body : JSON.stringify(result)
                })
  
}

module.exports.mongoGetOne=async (event, context, callback)=>{
  context.callbackWaitsForEmptyEventLoop=false;
  const connection =await mongoConnection
                            .catch(()=>callback(new Error("Mongo connection failed"),null))
  const result = await Product.findById(event.pathParameters.id)
                    .catch(()=>callback(new Error("Mongo query failed"),{
                      statusCode : 404,
                      body : "404 not found"
                    }))
  callback(null,{
    statusCode: 200,
    body : JSON.stringify(result)
                })
 
}


module.exports.mongoUpdate=async (event, context, callback)=>{
  context.callbackWaitsForEmptyEventLoop=false;
  const checkSchema= validateSchema.validate(JSON.parse(event.body),"post")
  if(checkSchema.error===null)
  {
    const connection =await mongoConnection
                 .then( async ()=>{
                        const result = await Product.findOneAndUpdate({_id : event.pathParameters.id},JSON.parse(event.body),{new : true})
                              .catch(()=>callback(new Error("Mongo query failed"),{
                                        statusCode : 404,
                                        body : "404 not found"
                                      }))
                                  })
                  .catch(()=>callback(new Error("Mongo connection failed"),null))

      callback(null,{
        statusCode: 200,
        body : "Updated"
      })
    }
  else{
    callback(null,{
      statusCode : 400,
      body: "Bad request"
    })
  }

 
}

module.exports.mongoDelete=async (event, context, callback)=>{
  context.callbackWaitsForEmptyEventLoop=false;
  const connection =await mongoConnection
                            .then( async ()=>{
                              const result = await Product.findOneAndRemove({_id : event.pathParameters.id})
                              .catch(()=>callback(new Error("Mongo query failed"),{
                                statusCode : 404,
                                body : "404 not found"
                              }))

                            })
                            .catch(()=>callback(new Error("Mongo connection failed"),null))
  callback(null,{
    statusCode: 200,
    body : "Deleted"
                })
 
}
