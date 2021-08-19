const sessionLengthDOM = document.querySelector('.session-length')
const sleepLengthDOM = document.querySelector('.sleep-length')
const moodRatingDOM = document.querySelector('.mood-rating')
const formDOM = document.querySelector('.session-form')

formDOM.addEventListener('submit', async (e) => {
    e.preventDefault()
    
    const sessionLength = sessionLengthDOM.value
    const sleepLength = sleepLengthDOM.value
    const moodRating = moodRatingDOM.value
    if (!(moodRating === '') && (moodRating > 5 || moodRating < 1) ) {
        alert("Mood rating must be 1-5")
        return false
    }


    if (sleepLength < 0 || sessionLength < 0) {
        alert("No negative times")
        return false
    }

    const uniqueID = Math.floor(Math.random() * 10000000000)
    const dateMiliseconds = Date.now()

    try {
        let payload = {
            "SessionID": uniqueID,
            "dateMiliseconds": dateMiliseconds,
        }
        if (!(sessionLength === '')){
            payload.sessionLength = sessionLength
        }
        if (!(sleepLength === '')){
            payload.sleepLength = sleepLength
        }
        if (!(sessionLength === '')){
            payload.moodRating = moodRating
        }
        console.log(payload)
        await axios.post('http://localhost:5000', payload)
    } catch (error) {
        console.log(error)
    }
})
