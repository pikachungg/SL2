const bodyParser = require('body-parser'); 
const express = require('express')
const cors = require('cors');

const app = express()
const port = 8000

app.use(cors());
app.use(bodyParser.json()); 

const authetication = require('./routes/Authetication.js')
const students = require('./routes/Students.js')
const professors = require('./routes/Professors.js')

app.post('/login', authetication.login);

app.get('/students/classid/:classid', students.getStudentsByClassId)

app.get('/students/uid/:uid', students.getStudentsByUID)

app.get('/professors/uid/:uid', professors.getProfessorById)

app.get('/professors/notifications/:professorid', professors.getRecentStudentsNotifications)

app.get('/professors/pinned/:uid', professors.getPinnedStudents)

app.get('/students/id/:id', students.getStudentsById)

app.patch('/professors/pinned', professors.addPinnedStudent)

app.delete('/professors/pinned', professors.removePinnedStudent)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})