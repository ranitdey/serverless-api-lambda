# lambda-serverless
Serverless api built using `Serverless framework` , `Lambda functions` , `AWS API Gateway Proxy` and `NodeJS` .This API uses `MongoDB` as a database for all CRUD operations.This application is ready to be deployed in AWS Lambda and with Serverless framework its just a command away. Only we need to configure the AWS account settings in the Serverless.YML . 

## Running project

### Run server locally with serverless framework
```sh
# This will emulate the actual AWS Lambda environment so that we could run and test it in local
sls offline start --port 4500 --skipCacheInvalidation
```

### Endpoints
**{get} http://localhost:4500/api/** : This will fetch all the products from MongoDB with a rate limiter.  <br />

**{post} http://localhost:4500/api/** : This endpoint will allow user to add products. Request should be made with respect to proper Json contract.<br />
```sh
# contract example
{
  "name": "iphone",
  "description": "Apple iphone",
  "price": 70000,
  "ispublished": true
}
```
**{put} http://localhost:4500/api/{id}** : This endpoint will allow user to update products. Request should be made with respect to proper Json contract.<br />
**{delete} http://localhost:4500/api/courses/** : This will allow user to delete  products from MongoDB  <br />

## Modules used

Some of non-standard modules used:

* [serverless](https://www.npmjs.com/package/serverless)
* [mongoose](https://www.npmjs.com/package/mongoose)
* [joi](https://www.npmjs.com/package/joi)
* [serverless-http](https://www.npmjs.com/package/serverless-http)
* [serverless-offline](https://www.npmjs.com/package/serverless-offline)
