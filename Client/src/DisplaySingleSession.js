import getHumanReadableDate from './getHumanReadableDate'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import CreateOrUpdateSession from './CreateOrUpdateSession'
import axios from 'axios'

export default function DisplaySingleSession({ session }) {
    const history = useHistory()
    let [isEditMode, setIsEditMode] = useState(false)
    let handleDelete = () => {
        axios.delete('http://localhost:8081/api/v1/sessions/' + session.SessionID)
        history.push('/sessions')
    }
    return (
        <div>
            {!isEditMode && 
            <div className="single-session">
                <h2>{getHumanReadableDate(session.dateMilliseconds)}</h2>
                {session.sessionLength && <p>You Meditated for {session.sessionLength} Minutes</p>}
                {session.sessionRating && <p>You Rated your session a {session.sessionRating}/5</p>}
                {session.sleepLength && <p>You Slept for {session.sleepLength} Hours the Night Before</p>}
                {session.moodRating && <p>You Rated Your Mood a {session.moodRating}/5</p>}
                <button onClick={()=>setIsEditMode(true)}>Edit</button><button onClick={handleDelete}>Delete</button>
            </div>}
            {isEditMode && <CreateOrUpdateSession session={session} editMode={true}/>}
        </div>
    )
}
