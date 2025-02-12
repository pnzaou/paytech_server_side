const express = require('express')
const cors = require('cors')
const router = require('./src/routes')
const bodyParser = require("body-parser")
const app = express()
const port = 8080

app
    .use(cors())
    .use(bodyParser.json())
    .use(router)

app.get("/", (req, res) => {
    res.send("hello api")
})

app.listen(port, () => {
    console.log(`cliquez sur http://localhost:${8080}`)
    console.log(bodyParser)
})
