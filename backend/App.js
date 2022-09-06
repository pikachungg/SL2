const express = require('express')
const app = express()
const port = 8000
const cors = require('cors');
const bodyParser = require('body-parser'); 

app.use(cors());
app.use(bodyParser.json()); 

const authetication = require('./routes/Authetication.js')

app.post('/login', authetication.login);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})