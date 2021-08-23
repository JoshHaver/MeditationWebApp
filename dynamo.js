const AWS = require('aws-sdk')
require('dotenv').config()

AWS.config.update({
    region: process.env.REGION,
    accessKeyId: process.env.ACCESS,
    secretAccessKey: process.env.SECRET,
})

const dynamoClient = new AWS.DynamoDB.DocumentClient()
const TABLE_NAME = 'MeditationDatabase'


const getSessions = async () => {
    const params = {
        TableName: TABLE_NAME,
    }
    const sessions = await dynamoClient.scan(params).promise()
    // sorts the array of items by date before displaying
    sessions.Items.sort((a, b) => b.dateMilliseconds - a.dateMilliseconds)
    return sessions
}

const addOrUpdateSession = async (session) => {
    const params = {
        TableName: TABLE_NAME,
        Item: session,
    }
    return await dynamoClient.put(params).promise()
}

const getSessionByID = async (SessionID) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            SessionID
        },
    }
    response = await dynamoClient.get(params).promise()
    // if the response is an empty object, throw error and app.js sends 404
    if (!Object.keys(response).length){
        throw `No Resource with id of ${SessionID}`
    }else{
        return response
    }

}

const deleteSession = async (SessionID) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            SessionID
        },
    }
    return await dynamoClient.delete(params).promise()
}

module.exports = {
    dynamoClient,
    getSessionByID,
    getSessions,
    deleteSession,
    addOrUpdateSession,
}