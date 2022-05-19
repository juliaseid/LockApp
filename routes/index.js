var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
// const app = require('../app');

dotenv.config();

const claims = { iss: 'myYonomiApp', sub: 'EvDevUser'};
function generateAccessToken(json) {
  return jwt.sign(json, process.env.TOKEN_SECRET, { expiresIn: '30s'});
}
// Create JWT
router.get('/create', (req, res) => {
  // if (req.header.authorization){
  // }
  const token = generateAccessToken(claims);
  res.send(token.compact());
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
