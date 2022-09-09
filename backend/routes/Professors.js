const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();
const client = require('../db/mongoconnection').client

const getProfessorById = router.get('/professors/uid/:uid', (req, res) => {
    let uid = req.params.uid
    client.connect( async (err) => {
        try{
            const collection = client.db("SL2").collection("Professors");
            let professor = await collection.findOne({_id: ObjectId(uid)}, {projection: {password: 0}})
            if (professor){
                res.status(200).send(professor)
            }
            else{
                res.status(404).send({'message': 'Professor not found'})
            }
        }
        catch{
            res.status(500).send(err)
        }
    })
})

module.exports = { getProfessorById }