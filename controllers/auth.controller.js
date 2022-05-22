const Models = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = Models.User
const Token = Models.Token;

const loginUser = async (req, res) => {
  const user = await User.findOne({where: {email: req.body.email}})

  if(user == null){
    return res.status(400).json({"message": "User not found"});
  }
  try{
    if(await bcrypt.compare(req.body.password, user.password)){
      const accessToken = generateToken(user.id) 
      const refreshToken = jwt.sign({id: user.id}, process.env.REFRESH_TOKEN_SECRET);
      res.header('auth-token', accessToken);
      const token = { token_id: refreshToken, id_user: user.id};
      await Token.create(token);
      res.status(200).json({ "message": "Successful login" });
    } else {
      res.status(403).json({"message":"Password is incorrect"});
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
  const refreshToken = req.header('auth-token')
  if(refreshToken == null) return res.sendStatus(401)
  const authToken = await Token.findOne({where: {token_id: refreshToken}})
  if(authToken === null) return res.sendStatus(403)
  jwt.verify(authToken.token_id, process.env.REFRESH_TOKEN_SECRET, (err, tk) => {
    if (err) return res.status(403).json({err})
    const accessToken = generateToken({name: tk.name});
    res.header('auth-token', accessToken);
  })
};

const logoutUser = async (req, res) => {
  const tokenUser = req.header('auth-token');
  try{
    const token = await Token.findOne({where: {token_id: tokenUser}})
    await token.destroy({ where: {id: token.id}});
    res.status(202).json({"message": "Logout successfully"});
  }catch(err){
    res.status(404).json({"message": "Logout Error", 
                          "error": err.message, 
                          "stack": err.stack
                        });
  }
};

module.exports.logoutUser = logoutUser;
module.exports.refreshToken = refreshToken;
module.exports.loginUser = loginUser;