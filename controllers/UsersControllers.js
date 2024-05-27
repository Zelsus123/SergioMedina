const { Users } = require("../Database/db");
const bcrypt = require('bcrypt')
const UserController = {};

UserController.getUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
    });
    res.json(users);
  } catch (error) {
    res.json({ message: error.message });
  }
};

UserController.createUser = async (req, res) => {
  try {

    const password = req.body.pass;
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    await Users.create({
        nombre: req.body.name,
        ci: req.body.ci,
        cargo: req.body.cargo,
        correo: req.body.correo,
        telefono: req.body.telefono,
        contras: hashedPassword
    });
    res.json("Registro creado exitosamente");
  } catch (error) {
    res.json({ message: error.message });
  }
};

UserController.getUserById = async (req, res) => {
  try {
    const user = await Users.findAll({
      where: { id: req.params.id },
    });
    res.json(user);
  } catch (error) {
    res.json({ message: error.message });
  }
};

UserController.deleteUser = async (req, res) => {
  try {
    await Users.destroy({
      where: { id: req.params.id },
    });
    res.json("Se ha eliminado el registro");
  } catch (error) {
    res.json({ message: error.message });
  }
};

UserController.updateUser = async (req, res) => {
  const user = await Users.findByPk(req.params.id)
  const newPassword = req.body.pass
  const oldPassword = user.contras
  const passwordMatch = await bcrypt.compare(newPassword,oldPassword)
  if (!passwordMatch) {
    try {
      await Users.update(req.body,{ where: { id: req.params.id } });
      res.json("Registro Modificado");
    } catch (error) {
      res.json({ message: error.message });
    }
  } else {
    res.json("Es la misma contrasena")
    
  }
  
};

module.exports = UserController;