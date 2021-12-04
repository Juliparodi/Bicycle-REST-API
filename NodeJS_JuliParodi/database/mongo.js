const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://juliparodi:<figura123>@cluster0.ixvq8.mongodb.net/sample_airbnb?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  console.log('conectado');
  client.close();
});