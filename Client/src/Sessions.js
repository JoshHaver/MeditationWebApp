import ShowAllSessions from './allSessions'
import LoadingScreen from './LoadingScreen'
import useFetch from './useFetch'

let Sessions = () => {
    let {data: sessions, isLoading, error } = useFetch('http://localhost:8081/api/v1/sessions')
    return ( 
        <div className="show-sessions">
            {isLoading && <div className="loading-screen"><LoadingScreen /></div>}
            {error && <div> {error} </div>}
            {sessions && <ShowAllSessions sessions={sessions.Items}/>}
        </div>
    )
}

export default Sessions