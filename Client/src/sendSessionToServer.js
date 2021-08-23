import axios from 'axios'

let sendSessionToServer = async (method, sessionLength, sessionRating, sleepLength, moodRating, id, date) => {
    const uniqueID = Math.floor(Math.random() * 10000000000)
    const dateMilliseconds = Date.now()
    let payload = {}
    if (method === 'post'){
        payload.SessionID = uniqueID
        payload.dateMilliseconds = dateMilliseconds
    }else{
        payload.SessionID = id
        payload.dateMilliseconds = date
    }
    if (sessionLength !== ''){
        payload.sessionLength = sessionLength
    }
    if (sessionRating !== ''){
        payload.sessionRating = sessionRating
    }
    if (sleepLength !== ''){
        payload.sleepLength = sleepLength
    }
    if (moodRating !== ''){
        payload.moodRating = moodRating
    }
    console.log(payload)
    try {
        if (method === 'post'){
            await axios.post('http://localhost:8081/api/v1/create', payload)
        }else{
            await axios.put('http://localhost:8081/api/v1/sessions/' + id, payload)
        }
    } catch (error) {
        console.log('Error sending put/post request')
    }
}

export default sendSessionToServer