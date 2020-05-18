
// Imports
const axios = require('axios').default;
const express = require('express');
const cors = require('cors');
const mongo = require('mongodb');
const uri = 'https://gist.githubusercontent.com/fg-uulm/666847dd7f11607fc2b6234c6d84d188/raw/2ca994ada633143903b10b2bf7ada3fd039cae35/mensa.json';

// Library inits
const app = express(); //execute the package express
//the ability to create different routes 
app.use(express.json()); //execute as middleware (check if user is authenticateted)
app.use(cors());

// MongoDB Client 
async function initMongoDB() {
  const client = await mongo.connect('mongodb://localhost:27017/mensa') //connect to MongoDb Server 
    .catch((err) => { console.log(err); });
  const db = await client.db();
  return db;
}
//insert a document 
async function updateDataBase(data) {
  const db = await initMongoDB();
  const addData = await db.collection('essen').insertOne(data, (err) => {
    if (err) throw err;
    console.log('Successfully updated!');
  });
  return addData;
}

async function getFromDataBase(keyword){
  const db = await initMongoDB();
  const getData = await db.collection('essen').find(keyword.toArray) //to Array ist das Ganze in einem Array gespeichert oder Objekt
  return getData; 
}

/*app.post('/mensa/insert', async (req, res) => {
  //Rausfinden ob Mahlzeit für gegebene Kategorie und Tag schon existiert
  let findResult = updateDataBase.find(essen => (essen.category === req.body.category && essen.day === req.body.day))//Json Array - wenn wahr ist wird element zurückgegeben - funktioniert ähnlich wie eine for schleife geht alles 
  //durch und prüft wie eine if abfrage die Elemente 
  if(findResult == undefined) {
    data.push(req.body);
    res.status(200).send();
  } else {
    res.status(418).send();
  }*/

  app.post('/mensa/insert', (req, res) => { //route 
    Object.keys(req.body).forEach(async (essen) => {
      const findResults = await getFromDataBase(essen);
      if (searchResults.length === 0) {
        await updateDataBase(req.body[essen]);
        res.status(200).send();
      } else {
        res.status(404).send('This meal already exists!');
      }
    });
  });






  /*if (!JSON.stringify(data).includes(JSON.stringify(req.body))) {
    data.push(req.body);
    res.status(200).send();
  } else {
    res.status(418).send();
  }*/
//});

/*app.post('/form_data', (req,res,next)=>{
  let findResult = postedData.find(essen => essen.category === req.body.category && essen.day === req.body.day)
  if (findResult == undefined) {
    postedData.push(req.body);;
    res.status(200).send();
  } else {
    res.status(418).send();
  }
  // postedData.push(req.body)
  // res.send("OK");
});*/




let data = '';
async function getData() {
  await axios.get(uri)
    .then((req) => {
      data = req.data;
    })
    .catch(() => {
      data = undefined;
    });
}

getData();
app.get('/mensa/:day', async (req, res) => {
  const findResults = await getFromDatabase({ day: req.params.day });
  if (findResults.length > 0) {
    res.send(findResults);
  } else {
    res.status(404).send('Error: 404');
  }
});


app.get('/api/getData/', (req, res) => {
  // eslint-disable-next-line no-console
  console.log('Access');
  res.status(200).send(data);
});
// Server starten
app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Example app listening on port 3000!');
});