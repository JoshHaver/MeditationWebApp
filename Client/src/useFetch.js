import { useState, useEffect } from "react"

const useFetch = (url) => {

    let [data, setData] = useState(null)
    let [isLoading, setIsLoading] = useState(true)
    let [error, setError] = useState(null)

    
    useEffect(() => {
        const abortController = new AbortController()

        fetch(url, {signal: abortController.signal})
            .then(res => {
                if (!res.ok){
                    setError("Res.ok returned false")
                    setIsLoading(false)
                    return Promise.reject(res)
                }else{
                    return res.json()
                }
            })
            .then(data => {
                setData(data)
                setIsLoading(false)
                setError(null)
            })
            .catch(err => {
                if (err.name === 'AbortError') {
                    console.log('Fetch aborted')
                }else{
                    setError("Could not find the resource at the provided url")
                    setIsLoading(false)
                }
            })
        return () => abortController.abort()
    }, [url])

    
    return { data, isLoading, error }
}
export default useFetch