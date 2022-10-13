const express = require('express');
const router = express.Router();
const client = require('../db/mongoconnection').client

const getAllStudents = router.get('/students', (req, res) => {
	client.connect( async (err) => {
		try {
			const collection = client.db("SL2").collection("Students");
			console.log(collection.s.db)
			res.status(200).send(collection)
		} catch {
			res.status(500).send(err)
		}
	})
})

const getStudentsByClassId = router.get('/students/classid/:classid' ,(req, res) => {
    let classid = req.params.classid
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

const getStudentsByCourses = router.get('/students/courses/', (req, res) => {
    let courses = req.query.course
    client.connect ( async (err) => {
        try{
            const collection = client.db('SL2').collection('Students')
            let students = await collection.find({"courses": {"$in": courses}}).toArray()
            res.status(200).send(students)
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

const getStudentsById = router.get('/students/id/:id', (req, res) => {
    let email = `${req.params.id}@rit.edu`
    client.connect( async (err) => {
        try{
            const collection = client.db("SL2").collection("Students");
            let student = await collection.findOne({email: email})
            if (student){
                res.status(200).send(student)
            }
        }
        catch{
            res.status(500).send(err)
        }
    })
})

module.exports = { getAllStudents, getStudentsByClassId, getStudentsByUID, getStudentsByCourses }