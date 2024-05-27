const express = require("express");
const { Config } = require("./config.js");
const RouterPrincipal = require("./routes/routes.js");
const { connection } = require("./Database/db.js");
//Declaramos express en una variable
const app = express();
//Para usar Multer
//Para la ruta estatica public
//Para poder llenar los req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//Uso de las rutas
app.use("/", RouterPrincipal);
//Escucha del servidor
app.listen(Config.PORT, () => {
  console.log(`La app esta inicializada en http://localhost:${Config.PORT}`);
  connection.sync({ force: true }).then(() => {
    console.log("Conexion con la base de datos exitosa");
  });
});