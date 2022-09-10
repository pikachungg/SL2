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

const getRecentStudentsNotifications = router.get('/professors/notifications/:professorid', (req, res) => {
    let professorid = req.params.professorid
    client.connect( async (err) => {
        try{
            const professorCollection = client.db("SL2").collection("Professors")
            let professorsClasses = await professorCollection.findOne({_id: ObjectId(professorid)}, {projection: {courses: 1}})
            let courses = professorsClasses.courses
            let attemptsArray = []
            let todaysDate = new Date()
            console.log(todaysDate)
            courses.forEach( course => {
                console.log(course)
            })
        }
        catch{
            res.status(500).send(err)
        }
    })
})

module.exports = { getProfessorById, getRecentStudentsNotifications }