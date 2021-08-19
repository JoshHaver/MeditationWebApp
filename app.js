const express = require('express')
const app = express()
const { getSessions, getSessionByID, addOrUpdateSession, deleteSession } = require('./dynamo')
require('dotenv').config()
const PORT = process.env.PORT || 5000

app.use(express.static('./public'))
app.use(express.json())
let logger = (req,res,next) => {
    console.log(req.body)
    next()
}
app.get('/sessions', async (req,res) =>{
    try {
        const sessions = await getSessions()
        res.json(sessions)
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ error: 'something went wrong'})
    }
})


app.get('/sessions/:id', async (req,res) =>{
    const id = Number(req.params.id)
    try {
        const session = await getSessionByID(id)
        res.json(session)
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ erorr: 'something went wrong'})
    }
})

app.post('/', logger, async (req,res) =>{
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

app.put('/sessions/:id', async (req,res) =>{
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

app.delete('/sessions/:id', async (req,res) =>{
    const id = Number(req.params.id)
    try {
        res.json(await deleteSession(id))
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ erorr: 'something went wrong'})
    }
})

app.listen(8080, () => {
    console.log(`Listening on port ${PORT}`)
})