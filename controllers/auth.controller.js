const Models = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = Models.User

async function addUser(req, res){
  const hashPass = await bcrypt.hash(req.body.password, 10);
  
  const user = {
    name: req.body.name,
    email: req.body.email,
    password: hashPass
  }

  if(User.findOne({where: {email: user.email}})) return res.status(409).send({"message": "User already exists"})
  
  try{
    await User.create(user);
    res.status(201).json(user);
  }
  catch(err){
    res.status(500).send(err.message);
  }
}

async function loginUser (req, res) {
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
  
}

function generateToken(payload){
  return jwt.sign({id: payload}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "10m" });
}


module.exports.addUser = addUser;
module.exports.loginUser = loginUser;