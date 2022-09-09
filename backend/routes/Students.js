const express = require('express');
const router = express.Router();
const client = require('../db/mongoconnection').client

const getStudentsByClassId = router.get('/students/classid/:classid' ,(req, res) => {
    let classid = req.params.classid
    console.log(classid)
    client.connect( async (err) => {
        try{
            const collection = client.db("SL2").collection("Students");
            let studentsCollection = await collection.find({courses: classid}).toArray()
            res.status(200).send(studentsCollection)
        }
        catch{
            res.status(500).send(err)
        }
    })
})

const getStudentsByUID = router.get('/students/uid/:uid', (req, res) => {
    let uid = req.params.uid
    client.connect (async (err) => {
        try{
            const collection = client.db("SL2").collection("Students");
            let student = await collection.findOne({uid: parseInt(uid)})
            if (student){
                res.status(200).send(student)
            }
            else{
                res.status(404).send({'message': 'Student not found'})
            }
        }
        catch{
            res.status(500).send(err)
        }
    })
})

module.exports = { getStudentsByClassId, getStudentsByUID }