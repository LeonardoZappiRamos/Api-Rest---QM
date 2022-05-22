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
  const userT = await User.findOne({where: {email: user.email}})
  if(!userT === null) return res.status(409).send({"message": "Foi encontrado um Usuário com o mesmo email."})
  
  try{
    await User.create(user);
    res.status(201).json({ "message": "Usuário criado com sucesso"});
  }
  catch(err){
    res.status(500).send({"message": "Erro na criação do usuário", "Erro": err.message});
  }
}

const deleUser = async (req, res) => {
  const idUser = req.query.id;
  if(idUser == null) return res.status(404).send({"message": "E necessário o ID do usuário"});
  try{
    const user = await User.findOne({where: {id: idUser}});
    if (user === null) return res.status(404).send({"message": "Não existe nenhum usuário com o ID informado"});
    await User.destroy({where: {id: user.id}});
    res.status(201).json({ message: "Usuário deletado com sucesso"});
  }
  catch(err){
    res.status(500).send(err.message);
  }
}

const listUsers = async (req, res) => {
  try {
    const Users = await User.findAll();
    res.status(200).send(Users);
  }catch (err) {
    res.status(500).send({"message": "Erro na listagem dos usuários", "Erro": err.message});
  }
}

const findUser = async (req, res) => {
  const userId = req.query.id;
  if (userId == null) return res.status(404).send({"message": "E necessário o ID do Usuário."})
  try {
    const user = await User.findOne({where: {id: userId}});
    if(user === null) return res.status(404).send({"message": "Usuário não existe"})
    res.status(200).send(user);
  }catch (err) {
    res.status(500).send({"message": "Erro na procura pelo usuário", 
                          "Erro": err.message,
                          "stack": err.stack
                        });
  }
}

module.exports.addUser = addUser;
module.exports.deleUser = deleUser;
module.exports.listUsers = listUsers;
module.exports.findUser = findUser;
