const express = require('express');
const router = express.Router();

const login = router.post('/login' , (req, res) => {
    let {username, password} = req.body
    console.log(username)
    console.log(password)
    res.status(200).send()
})

module.exports = { login }