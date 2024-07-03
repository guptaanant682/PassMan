const express = require('express')
const dotenv = require('dotenv')
const { MongoClient, ObjectId } = require('mongodb');
const bodyparser = require('body-parser')
const cors = require('cors')
dotenv.config()


const uri = "mongodb://localhost:27017";
// const url = 'mongodb://localhost:27017';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// const client = new MongoClient(url);


const dbName = 'passMan';
const app = express()
const port = 3000;  
app.use(bodyparser.json())
console.log(process.env)
app.use(cors())
client.connect();

// get all the passwords
app.get('/', async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
    res.send(findResult)
})

// set all the passwords
app.post('/', async (req, res) => {
    const password = req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.insertOne(password);
    res.send({success: true, result: findResult})
})


//Delete a password by ID
// app.delete('/', async (req, res) => {
//     const password = req.body
//     const db = client.db(dbName);
//     const collection = db.collection('passwords');
//     const findResult = await collection.deleteOne(password);
//     res.send({success: true, result: findResult})
// })


app.delete('/passwords', async (req, res) => {
    try {
        const { id } = req.body;
        const db = client.db(dbName);
        const collection = db.collection('passwords');
        const findResult = await collection.deleteOne({ _id: new ObjectId(id) });

        if (findResult.deletedCount === 1) {
            res.send({ success: true, result: findResult });
        } else {
            res.send({ success: false, message: 'Password not found' });
        }
    } catch (error) {
        console.error('Error deleting password:', error);
        res.status(500).send({ success: false, error: 'Failed to delete password' });
    }
});



app.listen(port, () =>{
    console.log(`Example app listening on http://localhost:${port}`);
})