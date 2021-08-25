const express = require('express')
const router = express.Router()
const { getAllSessions, getSession, logger, addSession, updateSession, delSession } = require('../controllers/meditation')

router.get('/sessions', getAllSessions)

router.post('/create', logger, addSession)

router.route('/sessions/:id').get(getSession).put(updateSession).delete(delSession)


module.exports = router