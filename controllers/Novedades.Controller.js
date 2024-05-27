const { Novedades } = require("../Database/db");
const NovedadesController = {};

NovedadesController.getNovedades = async (req, res) => {
  try {
    const novedades = await Novedades.findAll({
    });
    res.json(novedades);
  } catch (error) {
    res.json({ message: error.message });
  }
};

NovedadesController.createNovedad = async (req, res) => {
  try {
    await Novedades.create({
        titulo: req.body.titulo,
        fecha: Date.now(),
        contenido: req.body.contenido,
        imagen: req.body.imagen,
        autor: req.body.autor
    });
    res.json("Registro creado exitosamente");
  } catch (error) {
    res.json({ message: error.message });
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

NovedadesController.deleteNovedad = async (req, res) => {
  try {
    await Novedades.destroy({
      where: { id: req.params.id },
    });
    res.json("Se ha eliminado el registro");
  } catch (error) {
    res.json({ message: error.message });
  }
};

NovedadesController.updateNovedad = async (req, res) => {
  try {
    await Novedades.update(req.body, { where: { id: req.params.id } });
    res.json("Registro modificado exitosamente");
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports = NovedadesController;