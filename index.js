const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://organicUser:99qNR2tFMW1U5pzh@cluster0.bm8mo.mongodb.net/organicdb?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true,useUnifiedTopology: true });
app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html');
})
client.connect(err => {
  const collection = client.db("organicdb").collection("products");
  // perform actions on the collection object
  
  const product = {name: "modhu", price: 25, quantity: 20};
  collection.insertOne(product)
  .then(result =>{
    console.log('one product added');
  })
  console.log('Database connect');
  
});

app.listen(5000);