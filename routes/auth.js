const routes = require('express').Router();

require('dotenv').config()

const { addUser, loginUser } = require('../controllers/auth.controller');

routes.post('/register', addUser)

routes.post('/login', loginUser)

routes.delete('logout', (req, res) =>{
  res.json({"message": "logout"});
});

// TOKEN
/* routes.post('/auth/token',(req, res) => {
  const refreshToken = req.body.token
  if(refreshToken == null) return res.sendStatus(401)
  if(!tokenRefresh.includes(refreshToken)) return res.sendStatus(403)
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    const accessToken = generateToken({name: user.name});
    res.json({"access_token": accessToken})
  })
}); */

module.exports = routes;