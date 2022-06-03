const jwt = require('jsonwebtoken');

//generate JWT secret
// var secret = require('crypto').randomBytes(64).toString('hex');
// console.log (secret);

const claims = { iss: 'myYonomiApp', sub: 'EvDevUser'};
async function generateAccessToken(json) {
  return jwt.sign(json, process.env.TOKEN_SECRET, { algorithm: 'RS256', expiresIn: '24h' }, function(err, token) {console.log("boop")});
}
console.log(generateAccessToken(claims));

// Create JWT
// router.get('/create', (req, res) => {
//   // if (!req.header.authorization){
//     //handle errors
//   // }
//   var token = generateAccessToken(claims);
//   res.send(token);
// })


// //verify token format
// router.get('/verify/:token', (req, res) => {
//   const { token } = req.params
//   jwt.verify(token, process.env.TOKEN_SECRET, (err, verifiedJWT) => {
//     if(err){
//       res.send(err.message)
//     }else{
//       res.send(verifiedJWT)
//     }
//   })
// })