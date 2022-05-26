var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const https = require('https');
const dotenv = require('dotenv');
// const app = require('../app');
// const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
import fetch from 'node-fetch';
const { allDevices } = require('../queries');

const bodyParser = require('body-parser');
// const app = require('../app');

dotenv.config();
const tokenString = process.env.DEFAULT_TOKEN;
const accessTokenSecret = process.env.TOKEN_SECRET;
//TODO: clarify role of JWT
// const claims = { iss: 'myYonomiApp', sub: 'EvDevUser'};
// function generateAccessToken(json) {
//   return jwt.sign(json, process.env.TOKEN_SECRET, {algorithm: 'RS256'}, { expiresIn: '12h'});
// }

//authenticate JWT
//build this into standard request options
const authenticateToken = (req, res, next) => {
//   // generateAccessToken(claims);
  // const tokenString = process.env.DEFAULT_TOKEN;
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1]
    jwt.verify(token, accessTokenSecret, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

// const yonomiOptions = {
//   server: 'https://vd7bzp6o3e.execute-api.us-east-2.amazonaws.com/dev',
//   // headers: {
//   //   'authorization': 'Bearer $`{process.env.DEFAULT_TOKEN}`'
//   // }
// }

async function queryResponse (query) {
  try {
    const response = await fetch (
      'https://platform.yonomi.cloud/graphql',
      {
        method: 'POST',
        headers: new Headers( {
          "Content-Type": "application/json",
          "Authorization": `"Bearer ${process.env.DEFAULT_TOKEN}"`
        }),
        body: query,
      }
    )
      console.log(response);
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
  res.render('index', { title: 'My Devices' });
});

router.get('/devices', async (req, res) => {
  const data = await queryResponse(allDevices);
  res.send(data);
})

// router.get('/lockstatus', authenticateToken, (req, res, next) => {

//   res.render('lockstatus', {lockStatus: //function})
// })

module.exports = router;
