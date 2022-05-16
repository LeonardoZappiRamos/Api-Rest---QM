const jwt = require('jsonwebtoken');

module.exports = verifyToken = (req, res, next) => {
  const token = req.headers['auth-token']

  if(token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if(err) return res.status(403).json(err);
    req.user = user
    next()
  })
}