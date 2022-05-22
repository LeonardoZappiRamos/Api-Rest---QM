const Models = require('../models');
const bcrypt = require('bcrypt');

const User = Models.User

const addUser = async (req, res) => {
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

module.exports.addUser = addUser;
