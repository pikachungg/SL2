const express = require('express');
const router = express.Router();

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://username:sl2password@dblogs.haqtcfn.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const login = router.post('/login' , (req, res) => {
    let {email, password} = req.body
    client.connect( async (err) => {
        const collection = client.db("SL2").collection("Professors");
        let user = await collection.findOne({email: email, password: password})
        if (user){
            res.status(200).send(user)
        }
        else{
            res.status(404).send({'message': "Try again."})
        }
    })
    res.status(200).send()
})

module.exports = { login }