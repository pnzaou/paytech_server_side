const express = require('express')
const cors = require('cors')
const router = require('./src/routes')
const app = express()
const port = 8080

app
    .use(cors())
    .use(express.json())
    .use(router)

app.get("/", (req, res) => {
    res.send("hello api")
})

app.listen(port, () => {
    console.log(`cliquez sur http://localhost:${8080}`)
})