const express = require('express');
const db = require('./db')
var cors = require('cors')

// Create our app
const app = express();

// Make sure we are only accepting/outputting JSON
app.use(express.json())
app.use(cors())


app.get('/getCellsData', async (req, res) => {
    let dailyData = await db.getDailyCollection().find({ "value": 200 }).toArray()
    res.send(dailyData)
})

// localhost/writeCellsData/{value}
app.get('/writeCellsData/:value', async (req, res) => {
    let value = req.params.value
    await db.getDailyCollection().insertOne({
        "value": value
    })

    res.send("DONE EZ")
})

db.connectToServer();

// Listen on port 5000 - change this if you get an error "port already in use"
app.listen(5000, async () => {
    console.log('Server is running on port 5000');
})

