const express = require("express");
const SolicitudesController = require("../controllers/Solicitudes.Controller.js");
const SolicitudesRoutes = express.Router();

SolicitudesRoutes.get("/", SolicitudesController.getSolicitudes);
SolicitudesRoutes.post("/", SolicitudesController.createSolicitud);
SolicitudesRoutes.get("/:id", SolicitudesController.getSolicitudById);
SolicitudesRoutes.patch("/:id", SolicitudesController.updateSolicitud);
SolicitudesRoutes.delete("/:id", SolicitudesController.deleteSolicitud);

module.exports = SolicitudesRoutes;