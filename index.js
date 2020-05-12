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

/*const axios = require('axios').default;
const express = require('express');
const cors = require("cors"); //Sicherheitsmechanismus Websitekommunikation (fügt geforderten header hinzu )
// Library inits
const app = express();

let data = '';
app.use(express.json())
app.use(cors());
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
init();*/

/* // Imports
const axios = require('axios').default;
const express = require('express');

// Library inits
const app = express();
app.use(express.json());

let data = '';
const uri = 'https://gist.githubusercontent.com/fg-uulm/666847dd7f11607fc2b6234c6d84d188/raw/2ca994ada633143903b10b2bf7ada3fd039cae35/mensa.json';

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

app.get('/mensa/:day', (req, res) => {
  if (data !== undefined) {
    if (req.params.day === 'Di') {
      res.send(data);
    } else {
      res.status(404).send('Error: 404');
    }
  } else {
    res.status(404).send('Error: 404');
  }
});

app.post('/api/addData/', (req, res) => {
  if (!JSON.stringify(data).includes(JSON.stringify(req.body))) {  //macht einen string daraus und mit includes kann man vergleichen (ist in data schon das drin was reingeschickt wird) 
    data.push(req.body);
    res.status(200).send();
  } else {
    res.status(418).send();
  }
});

app.get('/api/getData/', (req, res) => {
  res.status(200).send(data);
});

// Server starten
app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Example app listening on port 3000!');
});*/


// Imports
const axios = require('axios').default;
const express = require('express');
const cors = require('cors');

// Library inits
const app = express();
app.use(express.json());
app.use(cors());

let data = '';
const uri = 'https://gist.githubusercontent.com/fg-uulm/666847dd7f11607fc2b6234c6d84d188/raw/2ca994ada633143903b10b2bf7ada3fd039cae35/mensa.json';

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

app.get('/mensa/:day', (req, res) => {
  if (data !== undefined) {
    switch (req.params.day) {
      case 'Di':
        res.send(data);
        break;
      default:
        res.status(404).send('Error: 404');
        break;
    }
  } else {
    res.status(404).send('Error: 404');
  }
});

app.post('/api/addData/', (req, res) => {
  if (!JSON.stringify(data).includes(JSON.stringify(req.body))) {  //macht einen string daraus und mit includes vergleicht man ob in data schon das drin ist was reingeschickt wird 
    data.push(req.body);
    res.status(200).send();
  } else {
    res.status(404).send();
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