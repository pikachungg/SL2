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

const getCoursesByProfessor = router.get('/professors/courses/:uid', (req, res) => {
    let uid = req.params.uid;
    client.connect( async (err) => {
        try{
            const collection = client.db("SL2").collection("Professors");
            let query = ({_id: ObjectId(uid)});
            let courses = await collection.find(query, {projection: {_id: 0, courses: 1}}).toArray()
            if(courses){
                res.status(200).send(courses)
            }
            else {
                res.status(404).send({'message': 'Professor was not found'})
            }
        }
        catch{
            res.status(500).send(err)
        }
    })
})

const addPinnedStudent = router.patch('/professors/pinned', (req, res) => {
    let professorid = req.query.puid
    let studentid = req.query.suid
    client.connect( async (err) => {
        try{
            const professorCollection = client.db("SL2").collection("Professors")
            const studentsCollection = client.db("SL2").collection("Students")
            let student = await studentsCollection.findOne({'username': studentid})
            if (student){
                let professor = await professorCollection.findOne({_id: ObjectId(professorid)})
                if (!professor.pinned.includes(studentid)){
                    console.log("Insert here")
                    professorCollection.updateOne({_id: ObjectId(professorid)}, {'$push': {'pinned': studentid}})
                    res.status(200).send({'message': `Added ${studentid} to ${professorid}'s pinned`})
                }
                else{
                    res.status(304).send({'message': `${studentid} already pinned by ${professorid}`})
                }
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

const removePinnedStudent = router.delete('/professors/pinned', (req, res) => {
    let professorid = req.query.puid
    let studentid = req.query.suid
    client.connect( async (err) => {
        try{
            const professorCollection = client.db("SL2").collection("Professors")
            const studentsCollection = client.db("SL2").collection("Students")
            let student = await studentsCollection.findOne({'username': studentid})
            if (student){
                let professor = await professorCollection.findOne({_id: ObjectId(professorid)})
                if (professor.pinned.includes(studentid)){
                    console.log("Insert here")
                    professorCollection.updateOne({_id: ObjectId(professorid)}, {'$pull': {'pinned': studentid}})
                    res.status(200).send({'message': `Removed ${studentid} from ${professorid}'s pinned`})
                }
                else{
                    res.status(304).send({'message': `${studentid} is not pinned by ${professorid}`})
                }
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

const getPinnedStudents = router.get('/professors/pinned/:uid', (req, res) => {
    let uid = req.params.uid
    client.connect( async (err) => {
        try{
            const collection = client.db("SL2").collection("Professors");
            let professor = await collection.findOne({_id: ObjectId(uid)}, {projection: {password: 0}})
            if (professor){
                res.status(200).send(professor.pinned)
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
            const studentsCollection = client.db("SL2").collection("Students")
            let professorsClasses = await professorCollection.findOne({_id: ObjectId(professorid)}, {projection: {courses: 1}})
            let courses = professorsClasses.courses
            let studentsArr = []
            let logs = []
            for (const course of courses){
                let students = await studentsCollection.find({courses: course}).toArray()
                studentsArr.push(...students)
            }
            studentsArr.forEach( student => {
                let newLogs = []
                student.logs.forEach(log => {
                    let jsonLog = {
                        "username": student.username,
                        "datetime": log.datetime,
                        "result": log.result
                    }
                    newLogs.push(jsonLog)
                })
                logs.push(...newLogs)
            })
            logs.sort( (a,b) => {
                return new Date(a.datetime) - new Date(b.datetime)
            })
            if (logs.length <= 5){
                res.status(200).send(logs)
            }
            else{
                res.status(200).send(logs.slice(-5))
            }
        }
        catch{
            res.status(500).send(err)
        }
    })
})

module.exports = { getProfessorById, getPinnedStudents, getRecentStudentsNotifications, addPinnedStudent, removePinnedStudent, getCoursesByProfessor }