const Models = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = Models.User

const loginUser = async (req, res) => {
  const user = await User.findOne({where: {email: req.body.email}})
  if(user == null){
    return res.status(400).json({"message": "User not found"});
  }
  try{
    if(await bcrypt.compare(req.body.password, user.password)){
      const accessToken = generateToken(user.id) 
      
      res.header('auth-token', accessToken);
      res.status(200).json({
        "message": "Successful login"
      });
    } else {
      res.status(403).send("Password is incorrect");
    }
  }
  catch(err){
    res.status(500).send(err.message);
  }
  
};

function generateToken(payload){
  return jwt.sign({id: payload}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "10m" });
};

const refreshToken = async (req, res) => {
  const refreshToken = req.body.token
  if(refreshToken == null) return res.sendStatus(401)
  if(!tokenRefresh.includes(refreshToken)) return res.sendStatus(403)
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    const accessToken = generateToken({name: user.name});
    res.header('auth-token', accessToken);
    res.sendStatus(200);
  })
};

//module.exports.logoutUser = logoutUser;
module.exports.refreshToken = refreshToken;
module.exports.loginUser = loginUser;