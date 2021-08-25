import { Link } from 'react-router-dom'
import getHumanReadableDate from './getHumanReadableDate'
let ShowAllSessions = ({ sessions }) => {
    return (
        <div className="all-sessions">
            {sessions.map((session) => (
                <div className='all-sessions' key={session.SessionID}>
                    <Link to={`/meditation/sessions/${session.SessionID}`} style={{ textDecoration: 'none' }}>
                        <h2>{getHumanReadableDate(session.dateMilliseconds)}</h2>
                        {session.sessionLength && <p>Session Length: {session.sessionLength}</p>}
                        {session.sessionRating && <p>Session Rating: {session.sessionRating}</p>}
                        {session.sleepLength && <p>Sleep Length: {session.sleepLength}</p>}
                        {session.moodRating && <p>Mood Rating: {session.moodRating}</p>}
                    </Link>
                </div>
            ))}
        </div>
    )
}

export default ShowAllSessions