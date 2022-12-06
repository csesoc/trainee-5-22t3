const express = require('express');
const db = require('./db')
var cors = require('cors')
var ObjectId = require('mongodb').ObjectID;

// Create our app
const app = express();

// Make sure we are only accepting/outputting JSON
app.use(express.json())
app.use(cors())


app.get('/dailydata', async (req, res) => {
    let dailyData = await db.getDailyCollection().find().toArray()
    res.status(200)
    res.send(dailyData)
})

app.get('/habits', async (req, res) => {
    let habitData = await db.getHabitCollection().find().toArray()
    res.status(200)
    res.send(habitData)
})
app.get('/habits/:id', async (req, res) => {
    let habitData = await db.getHabitCollection().find({"_id": ObjectId(req.params.id)}).toArray()
    res.status(200)
    res.send(habitData)
})
app.post('/habits/add', async (req, res) => {
    const { name, type } = req.body;
    const habit = {
        name: name,
        type: type,
        dates: [],
        active: true,
    }
    let habitData = await db.getHabitCollection().insertOne(habit)
    res.status(200)
    res.send(habit)
})

app.post('/habits/delete/:id', async (req, res) => {
    const id = req.params.id;

    db.getHabitCollection().updateOne(
        {"_id": ObjectId(id)},
        {$set: {"active": false}}
    );
    res.status(200)
    res.send({})
})
app.get('/habits', async (req, res) => {
    let habitData = await db.getHabitCollection().find().toArray()
    res.status(200)
    res.send(habitData)
})

app.post('/habits/add', async (req, res) => {
    const { name, type } = req.body;
    const habit = {
        name: name,
        type: type,
        dates: [],
        active: true,
    }
    let habitData = await db.getHabitCollection().insertOne(habit)
    res.status(200)
    res.send(habit)
})
// localhost/writeCellsData/{value}
// app.get('/writeCellsData/:value', async (req, res) => {
//     let value = req.params.value
//     await db.getDailyCollection().insertOne({
//         "value": value
//     })

//     res.send("DONE EZ")
// })

db.connectToServer();

// Listen on port 5000 - change this if you get an error "port already in use"
app.listen(5000, async () => {
    console.log('Server is running on port 5000');
})

