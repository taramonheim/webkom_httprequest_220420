// Imports
const axios = require('axios').default;
const express = require('express');
const cors = require('cors');
const mongo = require('mongodb').MongoClient;

const uri = 'https://gist.githubusercontent.com/fg-uulm/666847dd7f11607fc2b6234c6d84d188/raw/2ca994ada633143903b10b2bf7ada3fd039cae35/men sa.json';


// Library inits
const app = express(); //execute the package express
//the ability to create different routes 
app.use(express.json()); //execute as middleware (check if user is authenticateted)
app.use(cors());
//let loadedData;

// mongodb client init
async function initMongoDB() {
  const client = await mongo.connect('mongodb://127.0.0.1:27017/mensa')
    .catch((err) => { console.log(err); });
  const db = await client.db();
  return db;
}

//insert a document
async function updateDatabase(data){
  const db = await initMongoDB();
  const insertresult = await db.collection('essen').insertOne(data, (err) => {
    if (err) throw err;
    // eslint-disable-next-line no-console
    console.log('Added one document');
  });
  return insertresult;
}

async function getFromDatabase(keyword) {
  const db = await initMongoDB();
  const getData = await db.collection('essen').find(keyword).toArray();
  return getData;
}



async function getData() {
  await axios.get(uri)
    .then((req) => {
      // TODO: daten in mongo speichern und vorher checken ob schon drin ist, Tara!
      // data = req.data;
    })
    .catch(() => {
      // data = undefined;
    });
}
// getData(); // entkommentieren wenn fertig, Tara!

// webserver endpoints
app.get('/mensa/:day', async (req, res) => {
  //Endpoint umbennen 
  const db = await initMongoDB(); //functions from MongoDB
  let getresult = await db.collection('essen').find({ day : req.params.day}).toArray();
  console.log(getresult);
  if (getresult.length > 0) {
    res.send(getresult);
  } else {
    res.status(404).send('Error: 404');  // funktioniert solange mein keine Mahlzeit schickt die schon im System ist 
  }
});

app.post('/mensa/insert', async (req, res) => {
  if (typeof req.body === 'object' && !Array.isArray(req.body)) {
    const searchResults = await getFromDatabase(req.body);
    if (searchResults.length === 0) {
      await updateDatabase(req.body);
      res.status(200).send();
    } else {
      res.status(409).send('Conflict: Double Entry');
    }
  } else {
    res.status(409).send('Conflict: Illegal format (only json object allowed)');
  }
  // TODO: Database search by keywords / identifiying key instead of comparing the complete object (independence)
    /*  
    const db = await initMongoDB();
      // let anObject = { "name":"pudding", "day" : "Do" }
      let insertresult = await db.collection('essen').insertOne(req.body) //acess the information we are posting from body with req.body and post it to array "essen"
      const findResults = await getFromDatabase(req.body);
      if (findResults.length === 0 ) {
        res.status(200).send(insertresult);
      } else {
        res.status(409).send('Conflict: This meal already exists');
      }
      /*const findResults = await getFromDatabase(req.body);
      if (findResults.length === 0) {
        res.status(200).send();
      } else {
        res.status(409).send('Conflict: This meal already exists');
      }*/
    });

app.get('/api/getFromDatabase/', async (req, res) => {
  console.log('Access');
  // TODO: get data from mongodb database and send it instead of data
  // Tipp: https://www.npmjs.com/package/mongodb#find-all-documents
  //const getData = await getFromDatabase(req.body);
  const result = await getFromDatabase({});
  res.status(200).send(result);
});

// Server starten
app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});