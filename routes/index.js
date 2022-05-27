var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const https = require('https');
const dotenv = require('dotenv');
// const app = require('../app');
// const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const { allDevices } = require('../queries');
//TODO: body-parser is imported in app, instantiated with app.use() in app.js
// const bodyParser = require('body-parser');
// const app = require('../app');

dotenv.config();
const tokenString = process.env.DEFAULT_TOKEN;
//TODO: clarify role of JWT
// const claims = { iss: 'myYonomiApp', sub: 'EvDevUser'};
// function generateAccessToken(json) {
//   return jwt.sign(json, process.env.TOKEN_SECRET, {algorithm: 'RS256'}, { expiresIn: '12h'});
// }

// const yonomiOptions = {
//   server: 'https://vd7bzp6o3e.execute-api.us-east-2.amazonaws.com/dev',
//   // headers: {
//   //   'authorization': 'Bearer $`{process.env.DEFAULT_TOKEN}`'
//   // }
// }

async function queryResponse (query) {
  const { default: fetch } = await import('node-fetch');
  const bearerToken = "Bearer "+ tokenString;
  const headers = {
    "Content-Type": "application/json",
    "Authorization": bearerToken,
  }
  try {
    const response = await fetch (
      'https://platform.yonomi.cloud/graphql',
      {
        method: 'POST',
        headers: headers,
        body: query,
      }
    )
      if(response.ok) {
        return response.json();
      }
      else {
        throw new Error (`Response Status: ${response.status} (${response.statusText})`);
      }
  } catch (err) {
    console.log(err);
  } 
};

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'My Device Portal' });
});

router.get('/devices', async (req, res) => {
  const data = await queryResponse(allDevices);
  const innerData = Object.values(data)[0];
  const myData = innerData["me"];
  const deviceData = myData["devices"];
  const edgeData = deviceData["edges"];
  let nodeArray = [];
  edgeData.forEach(element => {
    nodeArray.push(Object.values(element));
  });
  let deviceArray = [];
  nodeArray.forEach(e => {
    e.forEach(d => {
      deviceArray.push(d);
    })
  })
  res.render('devices', {title: 'Device List', devices: deviceArray})
})

// router.get('/lockstatus', authenticateToken, (req, res, next) => {

//   res.render('lockstatus', {lockStatus: //function})
// })

module.exports = router;
