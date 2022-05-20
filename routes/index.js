var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
// const app = require('../app');

dotenv.config();

const claims = { iss: 'myYonomiApp', sub: 'EvDevUser'};
function generateAccessToken(json) {
  return jwt.sign(json, process.env.TOKEN_SECRET, {algorithm: 'RS256'}, { expiresIn: '12h'});
}

//authenticate JWT
function authenticateToken(req, res, next) {
  generateAccessToken(claims);
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    console.log(err)

    if (err) return res.sendStatus(403)

    req.user = user

    next()
  })
}


/* GET home page. */
router.get('/', authenticateToken, (req, res, next) => {

  res.render('index', { title: 'Express' });
});

module.exports = router;
