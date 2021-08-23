import React from 'react'
import { useParams } from 'react-router-dom'
import useFetch from './useFetch'
import NotFound from './NotFound'
import DisplaySingleSession from './DisplaySingleSession'

export default function SessionDetails() {
    let { id } = useParams()
    const { data: session, isLoading, error } = useFetch('https://joshhaver.com/api/v1/sessions/' + id)
    return (
        <div className="session-details">
            {isLoading && <div>Loading...</div>}
            {error && <NotFound />}
            {session && <DisplaySingleSession session={session.Item}/>}
        </div>
    )
}
