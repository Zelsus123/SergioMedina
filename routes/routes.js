const express = require('express')
const RouterPrincipal = express.Router();
const userRoutes = require("./users.routes.js")
const novedadesRoutes = require("./noticias.routes.js")
const solicitudesRoutes = require("./constancias.routes.js")

RouterPrincipal.get('/', (req,res)=>{
    res.json('Hola Mundo');
});

RouterPrincipal.use("/users", userRoutes)
RouterPrincipal.use("/novedades", novedadesRoutes)
RouterPrincipal.use("/solicitudes", solicitudesRoutes)


module.exports = RouterPrincipal;