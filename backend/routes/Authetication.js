const express = require('express');
const router = express.Router();

let client = require('../db/mongoconnection').client

const login = router.post('/login' , (req, res) => {
    let {email, password} = req.body
    client.connect( async (err) => {
        const collection = client.db("SL2").collection("Professors");
        let user = await collection.findOne({email: email, password: password})
        if (user){
            console.log(user)
            res.status(200).send(user)
        }
        else{
            console.log("error")
            res.status(404).send({'message': "Try again."})
        }
    })
})

module.exports = { login }