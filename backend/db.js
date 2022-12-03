const { MongoClient } = require('mongodb')

const url = 'mongodb://127.0.0.1/'
const client = new MongoClient(url)

let dbConnection;
let dailyCollection;
let habitCollection;

const connectToServer = async () => {
    await client.connect()

    dbConnection = client.db("tracker");
    dailyCollection = dbConnection.collection("dailydata");
    habitCollection = dbConnection.collection("habits");
}

module.exports = {
    connectToServer: connectToServer,
    getDb: () => {
        return dbConnection;
    },
    getDailyCollection: () => {
        return dailyCollection;
    },
    getHabitCollection: () => {
        return habitCollection;
    }
};