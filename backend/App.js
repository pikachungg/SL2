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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})