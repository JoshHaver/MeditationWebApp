import { React, useState } from 'react'
import { useHistory } from 'react-router-dom'
import sendSessionToServer from './sendSessionToServer'

export default function CreateOrUpdateSession({ session, editMode }) {
    let [sessionLength, setSessionLength] = useState('')
    let [sessionRating, setSessionRating] = useState('')
    let [sleepLength, setSleepLength] = useState('')
    let [moodRating, setMoodRating] = useState('')
    const history = useHistory()

    let handleSubmit = async (e) => {
        e.preventDefault()
        if (editMode){
            await sendSessionToServer('put', sessionLength,sessionRating,sleepLength,moodRating,session.SessionID,session.dateMilliseconds)
        }else{
            await sendSessionToServer('post',sessionLength,sessionRating,sleepLength,moodRating)
        }
        
        if (editMode) {
            // sends the user back a page to the edit 
            history.push('/meditation/sessions')
        }else{
            // resets state to '' so that the inputs clear after form submit
            setSessionLength('')
            setSessionRating('')
            setSleepLength('')
            setMoodRating('')
        }
        
        

    }
    return (
        <div className="create">
            {editMode && <h2>Edit Session</h2>}
            {!editMode && <h2>Add a New Meditation Session</h2>}
            <form onSubmit={handleSubmit}>
                <label>Session Length in Minutes</label>
                <input
                    type="number"
                    required
                    min="0"
                    placeholder="e.g. 10"
                    value = {sessionLength}
                    onChange={(e)=>setSessionLength(e.target.value)}
                />
                <label>Rate Your Session 1-5</label>
                <input 
                    type="number"
                    min="1"
                    max="5"
                    placeholder="e.g. 4"
                    value={sessionRating}
                    onChange={(e)=>setSessionRating(e.target.value)}
                />
                <label>Hours Slept Last Night</label>
                <input 
                    type="number"
                    min="0"
                    placeholder="e.g. 8"
                    value={sleepLength}
                    onChange={(e)=>setSleepLength(e.target.value)}
                />
                <label>Rate Your Mood 1-5</label>
                <input 
                    type="number"
                    min="1"
                    max="5"
                    placeholder="e.g. 5"
                    value={moodRating}
                    onChange={(e)=>setMoodRating(e.target.value)}
                />
                {editMode && <button>Update Session</button>}
                {!editMode && <button>Add Session</button>}
            </form>
        </div>
    )
}
