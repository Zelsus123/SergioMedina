const { Novedades } = require("../Database/db");
const NovedadesController = {};

NovedadesController.getNovedades = async (req, res) => {
  try {
    const novedades = await Novedades.findAll({
    });
    return novedades
  } catch (error) {
    console.error("error al obtener noticias", error)
  }
};

NovedadesController.createNovedad = async (novedad) => {
  try {
   const nuevaNovedad = await Novedades.create({
        titulo: novedad.titulo,
        fecha: novedad.fecha,
        contenido: novedad.contenido,
        imagen: novedad.imagen ? novedad.imagen : "https://cdn.pixabay.com/photo/2024/03/27/15/19/ai-generated-8659303_1280.jpg",
        autor: novedad.autor
    });
    return nuevaNovedad
  } catch (error) {
    console.error(error)
  }
};

NovedadesController.getNovedadById = async (req, res) => {
  try {
    const novedad = await Novedades.findAll({
      where: { id: req.params.id },
    });
    res.json(novedad);
  } catch (error) {
    res.json({ message: error.message });
  }
};

NovedadesController.deleteNovedad = async (id) => {
  try {
      // Intenta eliminar el usuario con el ID proporcionado
      const result = await Novedades.destroy({
          where: { id },
      });
      
      // Verifica si se eliminó algún registro
      if (result === 0) {
          throw new Error(`No se encontró novedad con ID ${id}`);
      }
      
      console.log("Se ha eliminado el registro con ID: " + id);
      return { message: "Usuario eliminado exitosamente." }; // Devuelve un mensaje de éxito
  } catch (error) {
      console.error("Error al eliminar el usuario:", error);
      throw new Error("No se puede eliminar el usuario: " + error.message); // Proporciona un mensaje de error más específico
  }
};

NovedadesController.updateNovedad = async (novedadData) => {
  try {
    // Busca la novedad por ID
    console.log(novedadData)
    const novedad = await Novedades.findByPk(novedadData.id);

    // Si la novedad no existe, lanza un error
    if (!novedad) {
      throw new Error("Novedad no encontrada");
    }

    // Extrae los campos del objeto novedadData
    const { titulo, contenido, imagen } = novedadData;

    // Actualiza los campos solo si se proporcionan
    if (titulo !== undefined) {
      novedad.titulo = titulo;
    }
    if (contenido !== undefined) {
      novedad.contenido = contenido;
    }
    if (imagen !== undefined) {
      novedad.imagen = imagen;
    }

    // Guarda la novedad actualizada en la base de datos
    await novedad.save();

    return { novedad }; // Retorna la novedad actualizada
  } catch (error) {
    throw new Error("Error al actualizar la novedad: " + error.message);
  }
};

module.exports = NovedadesController;