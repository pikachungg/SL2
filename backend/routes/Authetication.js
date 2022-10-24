const express = require('express');
const router = express.Router();
const client = require('../db/mongoconnection').client

const login = router.post('/login' , (req, res) => {
    let {email, password} = req.body
    client.connect( async (err) => {
        try{
            const collection = client.db("SL2").collection("Professors");
            let user = await collection.findOne({email: email, password: password})
            if (user){
                res.status(200).send(user._id)
            }
            else{
                res.status(404).send({'message': "User not found try again."})
            }
        }
        catch{
            res.status(500).send(err)
        }
    })
})

module.exports = { login }