const bodyParser = require('body-parser'); 
const express = require('express')
const cors = require('cors');

const app = express()
const port = 8000

app.use(cors());
app.use(bodyParser.json()); 

const authetication = require('./routes/Authetication.js')

app.post('/login', authetication.login);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})