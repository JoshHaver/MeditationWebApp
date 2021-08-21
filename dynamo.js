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
    return await dynamoClient.get(params).promise()
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
const ses0 = {
    'SessionID': 0,
    'sessionLength': 10,
    'sleepLength': 8,
    'moodRating': 4
}

module.exports = {
    dynamoClient,
    getSessionByID,
    getSessions,
    deleteSession,
    addOrUpdateSession,
}
