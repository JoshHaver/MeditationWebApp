const { getSessions, getSessionByID, addOrUpdateSession, deleteSession } = require('../dynamo')
const path = require('path')

const logger = (req,res,next) => {
    console.log(req.body)
    next()
}

const getAllSessions = async (req,res) =>{
    try {
        const sessions = await getSessions()
        res.json(sessions)
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ error: 'something went wrong'})
    }
}

const getSession = async (req,res) =>{
    const id = Number(req.params.id)
    try {
        const session = await getSessionByID(id)
        res.json(session)
    }
    catch (error) {
        console.error(error)
        res.status(404).json({ erorr: 'something went wrong'})
    }
}

const addSession = async (req,res) =>{
    const session = req.body
    try {
        const newSession = await addOrUpdateSession(session)
        res.json(newSession)
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ error: 'something went wrong'})
    }

}

const updateSession = async (req,res) =>{
    const session = req.body
    try {
        
        const updatedSession = await addOrUpdateSession(session)
        res.json(updatedSession)
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ erorr: 'something went wrong'})
    }
}

const delSession = async (req,res) =>{
    const id = Number(req.params.id)
    try {
        res.json(await deleteSession(id))
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ erorr: 'something went wrong'})
    }
}

module.exports = { getAllSessions, getSession, logger, addSession, updateSession, delSession }