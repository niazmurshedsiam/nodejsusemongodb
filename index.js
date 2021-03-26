const express = require('express');
const app = express();
const ObjectId = require('mongodb').ObjectID;
const bodyParser = require('body-parser');
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended:false}));
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://organicUser:99qNR2tFMW1U5pzh@cluster0.bm8mo.mongodb.net/organicdb?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true,useUnifiedTopology: true });
app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html');
})
client.connect(err => {
  const productCollection = client.db("organicdb").collection("products");
  app.get('/products',(req,res)=>{
    productCollection.find({})
    .toArray((err,document)=>{
      res.send(document);
    })
  })
  app.post("/addProduct",(req,res)=>{
    const product = req.body;
    productCollection.insertOne(product)
    .then(result =>{
      console.log('data added successfully');
      res.send('success');
    })
  })
  app.delete('/delete/:id',(req,res)=>{
    productCollection.deleteOne({_id: ObjectId(req.params.id)})
    .then(result =>{
      console.log(result);
    })
  })
});

app.listen(5000);