const { Users } = require("../Database/db");
const bcrypt = require('bcrypt')
const UserController = {};

const saltRounds = 10
const salt =  bcrypt.genSaltSync(saltRounds)


UserController.getUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
    });
    return users
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
  }
};

UserController.createUser = async (userData) => {
  try {
    const password = userData.contras; // Accede a la contraseña del payload
 
    const hashedPassword = await bcrypt.hash(password, salt);

   const newUser = await Users.create({
      nombre: userData.nombre,
      ci: userData.ci,
      cargo: userData.cargo,
      correo: userData.correo,
      telefono: userData.telefono,
      contras: hashedPassword, // Guarda la contraseña hasheada
    });

    return newUser; // Mensaje de éxito
  } catch (error) {
    throw new Error("Error al crear el usuario: " + error.message); // Lanza un error si falla
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

UserController.deleteUser = async (id) => {
  try {
      // Intenta eliminar el usuario con el ID proporcionado
      const result = await Users.destroy({
          where: { id },
      });
      
      // Verifica si se eliminó algún registro
      if (result === 0) {
          throw new Error(`No se encontró usuario con ID ${id}`);
      }
      
      console.log("Se ha eliminado el registro con ID: " + id);
      return { message: "Usuario eliminado exitosamente." }; // Devuelve un mensaje de éxito
  } catch (error) {
      console.error("Error al eliminar el usuario:", error);
      throw new Error("No se puede eliminar el usuario: " + error.message); // Proporciona un mensaje de error más específico
  }
};
UserController.updateUser = async (id, userData) => {
  try {
    const user = await Users.findByPk(id);

    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    const { nombre, ci, cargo, correo, telefono, contras } = userData;

    // Si se envía una nueva contraseña, verifica y cifrala si es diferente
    if (contras) {
      const passwordMatch = await bcrypt.compare(contras, user.contras);
      if (!passwordMatch) {
        user.contras = await bcrypt.hash(contras, salt);
      }
    }

    // Actualiza los campos proporcionados
    user.nombre = nombre || user.nombre;
    user.ci = ci || user.ci;
    user.cargo = cargo || user.cargo;
    user.correo = correo || user.correo;
    user.telefono = telefono || user.telefono;

    await user.save();

    return { id, userData: user }; // Retorna el usuario actualizado
  } catch (error) {
    throw new Error("Error al actualizar el usuario: " + error.message);
  }
};


UserController.loginUser = async (loginData) => {
  try {
    const {ci, contras} = loginData

    const user = await Users.findOne({where:{ci}})

    if(!user){
      console.error("usuario no existe")
    }

    const passwordMatch = await bcrypt.compare(contras, user.contras)

    if(!passwordMatch){
      throw new Error ("Contrase;a incorrecta")
    }
    return {
      message: "Login exitoso",
      user: {
        id: user.id,
        nombre: user.nombre,
        ci: user.ci,
        cargo: user.cargo,
        correo: user.correo,
        telefono: user.telefono
      }
    };
  } catch (error) {
    throw new Error ("Error al realizar el login: " + error.message)
  }
}


module.exports = UserController;