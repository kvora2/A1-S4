const express = require('express')
const path = require('path')
const cors = require('cors')
const app = express()
const HTTP_PORT = process.env.PORT || 8080
require('dotenv').config()

app.use(express.json())

app.use(cors())

app.get("/", (req, res)=> {
    res.send({Message: "API Listening"})
})

app.listen(HTTP_PORT, () => {
    console.log("Listening on Port " + HTTP_PORT)
})