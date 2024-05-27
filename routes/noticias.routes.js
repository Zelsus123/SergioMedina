const express = require("express");
const NovedadesController = require("../controllers/Novedades.Controller.js");
const NovedadesRoutes = express.Router();

NovedadesRoutes.get("/", NovedadesController.getNovedades);
NovedadesRoutes.post("/", NovedadesController.createNovedad);
NovedadesRoutes.get("/:id", NovedadesController.getNovedadById);
NovedadesRoutes.patch("/:id", NovedadesController.updateNovedad);
NovedadesRoutes.delete("/:id", NovedadesController.deleteNovedad);

module.exports = NovedadesRoutes;