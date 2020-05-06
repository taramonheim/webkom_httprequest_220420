/*const axios = require('axios')
const express = require('express');
const app = express();

//get request 
axios({
  method:'get',
  url: 'https://gist.githubusercontent.com/fg-uulm/666847dd7f11607fc2b6234c6d84d188/raw/2ca994ada633143903b10b2bf7ada3fd039cae35/mensa.json',
  responseType:'json',
})
.then(res => console.log(res))
.catch(err => console.error(err));



//Params - REST-artig

//Params - REST-artig
app.get('/user/:uid', function (req, res) {
  res.send("User ID is set to " + req.params.uid);
  //tu was
});

app.get('/mensa/:day', (req, res) => {
  if (req.params.day === 'Di') {
    res.send(data);
  } else {
    res.status(404).send('404');
  }
  // tu was
});

// Server starten
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});*/


/*axios({
  method: 'get',
  url: 'https://gist.githubusercontent.com/fg-uulm/666847dd7f11607fc2b6234c6d84d188/raw/2ca994ada633143903b10b2bf7ada3fd039cae35/mensa.json',
  responseType: 'json',
})
  .then((response) => {
    const output = response.data;
    // eslint-disable-next-line no-console
    console.log(output);
    data = output;
  });


// Params - REST-artig
app.get('/user/:uid', (req, res) => {
  res.send(`User ID is set to ${req.params.uid}`);
  // tu was
});

app.get('/mensa/:day', (req, res) => {
  if (req.params.day === 'Di') {
    res.send(data);
  } else {
    res.status(404).send('404');
  }
  // tu was
});

// Server starten
app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Example app listening on port 3000!');
});*/

// Imports

const axios = require('axios').default;
const express = require('express');
// Library inits
const app = express();

let data = '';
app.use(express.json())
let init = async () => {
  let mensaAPI = await axios.get("https://gist.githubusercontent.com/fg-uulm/666847dd7f11607fc2b6234c6d84d188/raw/2ca994ada633143903b10b2bf7ada3fd039cae35/mensa.json")
  console.log(mensaAPI);
  data = mensaAPI.data;
}

app.get('/mensa/:day', (req, res) => {
  if (req.params.day === 'Di') {
    res.send(data);
  } else {
    res.status(404).send('404');
  }
  // tu was
});


app.post('/api/addData/', (req, res) => {
  data.push(req.body);
  console.log(req.body);
  res.status(200).send();
});

// Server starten
app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Example app listening on port 3000!');
});
init();