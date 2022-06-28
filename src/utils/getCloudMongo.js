const { MongoClient, ServerApiVersion } = require('mongodb');

const password = "eqQ6hTH6YHAg"

const uri = "mongodb+srv://Erkan:" + password + "@cluster0.4huxn.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const getDbData = () => {
    client.connect(async err => {
        const db = client.db("IoT")
        const collection = db.collection("collection1");
        // perform actions on the collection object
    const pipeline = [
        {
            $match: {
                
                    'payload.temp': {
                        $gt: 2
                    } 
                }
            }, {
            $limit: 200
        }, {
            $sort: {
                'payload.time.min': 1
            },
            $sort: {
                'payload.time.hour': 1
            },
            $sort: {
                'payload.time.dayOfYear': 1
            }
        }
    ]
    
    const results = await collection.find({
        'payload.temp': { $gt: 2 }
    }).sort({
        'payload.time.min': 1
    }).sort({
        'payload.time.hour': 1
    }).sort({
        'payload.time.dayOfYear': 1
    })
    .toArray()
    .then(res => {
        return res
    })
    .catch(error => {
        console.error(error);
        console.log('Find() Error!')
    })
    
    const agg = await collection.aggregate(pipeline)
    .toArray()
    .then(res => {
        console.log("Agg compelted successfully.")
        return res
    })
    .catch(error => {
        console.error(error);
        console.log('Agg() Error!')
    })
    
    for (let ii = 0; ii < results.length; ii++) {
        console.log("Day: " + results[ii].payload.time.dayOfYear + "   Time: " + results[ii].payload.time.hour + ":" + results[ii].payload.time.min + "   Temp: " + results[ii].payload.temp)
    }
    console.log("Results: " + results.length)
    client.close();
    });
    return results
}

module.exports = getDbData


/*
const MongoClient = require('mongodb').MongoClient;
// const Mongo = require('mongodb');

const url = 'mongodb://127.0.0.1:27017';
// const url = 'localhost:27017';

// db = new Mongo().getDB("IoT");

MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err, client) => {
    if (err) {
        return console.log(err);
    }

    // Specify database you want to access
    const db = client.db('IoT');

    console.log(`MongoDB Connected: ` + url);
    // console.log(db);
    
    const test = db.collection('test');
    // test.insertOne({ name: 'Web Security' }, (err, result) => { });
    
    test.find().toArray((err, results) => {
        if (err) {
            return
        }
        console.log(results[0].payload);
    })
    return
})

*/