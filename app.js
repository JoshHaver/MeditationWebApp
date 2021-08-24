const express = require('express')
const app = express()
const path = require('path')
const { getSessions, getSessionByID, addOrUpdateSession, deleteSession } = require('./dynamo')
require('dotenv').config()
const cors=require("cors"); 
const corsOptions ={ origin:'*', credentials:true, optionSuccessStatus:200, }
const PORT = process.env.PORT || 8081

app.use(cors(corsOptions))
// send the react front end
app.use(express.static(path.resolve('Client', 'build')))
app.use(express.json())

let logger = (req,res,next) => {
    console.log(req.body)
    next()
}
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '/home/index.html'))
})
app.get('/meditation/api/v1/sessions', async (req,res) =>{
    try {
        const sessions = await getSessions()
        res.json(sessions)
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ error: 'something went wrong'})
    }
})


app.get('/meditation/api/v1/sessions/:id', async (req,res) =>{
    const id = Number(req.params.id)
    try {
        const session = await getSessionByID(id)
        res.json(session)
    }
    catch (error) {
        console.error(error)
        res.status(404).json({ erorr: 'something went wrong'})
    }
})

app.post('/meditation/api/v1/create', logger, async (req,res) =>{
    const session = req.body
    try {
        const newSession = await addOrUpdateSession(session)
        res.json(newSession)
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ error: 'something went wrong'})
    }

})

app.put('/meditation/api/v1/sessions/:id', async (req,res) =>{
    const session = req.body
    try {
        
        const updatedSession = await addOrUpdateSession(session)
        res.json(updatedSession)
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ erorr: 'something went wrong'})
    }
})

app.delete('/meditation/api/v1/sessions/:id', async (req,res) =>{
    const id = Number(req.params.id)
    try {
        res.json(await deleteSession(id))
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ erorr: 'something went wrong'})
    }
})
// sends if the user enters a url that isnt the homepage or an api link 
app.get('*', (req, res) => {
    res.sendFile(path.resolve('Client', 'build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
