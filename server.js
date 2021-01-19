const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const path = require("path")

require('dotenv/config')

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, "client", "build")))

const uri = process.env.URI
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false })
const dbConnection = mongoose.connection
dbConnection.once('open', () => console.log('DB Connection successfully established'))

const usersRouter = require('./routes/users')
const aboutRouter = require('./routes/posts')

app.use('/users', usersRouter)
app.use('/posts', aboutRouter)

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => console.log(`Listening on port ${port}`))