const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const routesUrls = require('./routes/routes')
const cors = require('cors')

//initialize dotenv
dotenv.config()

mongoose.connect(process.env.DATABASE_ACCESS, ()=>console.log("Db connected"))

app.use(express.json())//Activating body parser
app.use(cors())
app.use('/app', routesUrls)//All request or reponse urls appended here
app.listen(4000, () => console.log("server is up"))