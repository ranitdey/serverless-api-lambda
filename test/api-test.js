const fetch = require('node-fetch');
const chai = require('chai');
const assert= chai.assert
const should=chai.should()
const Body ={
    "name": "iphone",
    "description": "Apple iphone",
    "price": 70000,
    "ispublished": true
  }
const url = 'http://localhost:4500/api/'
async function userActionPost(URL)
{
    const response = await fetch(URL, {
      method: 'POST',
      body: JSON.stringify(Body),
      headers:{
        'Content-Type': 'application/json'
      }
    });
    const responseJson = await response.json(); 
    assert.equal(responseJson.name,Body.name)
    assert.equal(responseJson.description,Body.description)
    should.exist(responseJson._id)
  }

  userActionPost(url)