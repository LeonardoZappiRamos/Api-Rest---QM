const Models = require('../models');

const Role = Models.Role

const addRole = async (req, res) => {
  const perfil = {
    name: req.body.name,
  }
  if (perfil == null) return res.status(400).send({ "message": "O nome do perfil e necessário."})
  try {
    await Role.create(perfil);
    res.status(201).json({ "message": "Perfil criado com sucesso." });
  }catch (err) {
    res.status(500).send({ 
      "message": "Error em Adicionar a Perfil",
      "Erro": err.message
    })
  }
}

const delRole = async (req, res) => {
  const perfil = await Role.findOne({where: {id: req.query.id}});
  if (perfil == null) return res.status(400).send({ "message": "Não foi possível achar o perfil."});
  try {
    await Role.destroy({where: {id: perfil.id}});
    res.status(201).json({ "message": "Perfil deletado com sucesso." });
  }catch (err) {
    res.status(500).send({ 
      "message": "Error em remover o Perfil",
      "Erro": err.message
    })
  }
}

const listRole = async (req, res) => {
  try {
    const perfis = await Role.findAll();
    res.status(200).json(perfis);
  }catch (err) {
    res.status(500).send({ "message": "Erro na listagem do Perfil", "erro": err.message });
  }
}

module.exports.addRole = addRole;
module.exports.delRole = delRole;
module.exports.listRole = listRole;