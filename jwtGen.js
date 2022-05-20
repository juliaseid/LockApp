//generate JWT secret
var secret = require('crypto').randomBytes(64).toString('hex');
console.log (secret);

// Create JWT
router.get('/create', (req, res) => {
  // if (!req.header.authorization){
    //handle errors
  // }
  var token = generateAccessToken(claims);
  res.send(token);
})


//verify token format
router.get('/verify/:token', (req, res) => {
  const { token } = req.params
  jwt.verify(token, process.env.TOKEN_SECRET, (err, verifiedJWT) => {
    if(err){
      res.send(err.message)
    }else{
      res.send(verifiedJWT)
    }
  })
})