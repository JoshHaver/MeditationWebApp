const express = require('express')
const app = express()
const path = require('path')
const meditation = require('./routes/meditation')
require('dotenv').config()
const cors=require("cors"); 
const corsOptions ={ origin:'*', credentials:true, optionSuccessStatus:200, }
const PORT = process.env.PORT || 8081

app.use(cors(corsOptions))

app.use(express.static(path.join(__dirname, 'home'))) // use the html home page
app.use(express.static(path.resolve('Client', 'build')))// use the react front end
app.use(express.json())
app.use('/meditation/api/v1', meditation)

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '/home/index.html'))
})

// sends if the user enters a react url that isnt the homepage or an api link 
app.get('/meditation/*', (req, res) => {
    res.sendFile(path.resolve('Client', 'build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
