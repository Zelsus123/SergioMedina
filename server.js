const express = require("express");
const cors = require("cors"); // Importa el paquete cors
const { Config } = require("./config.js");
const RouterPrincipal = require("./routes/routes.js");
const { connection } = require("./Database/db.js");
const fs = require('fs'); // Módulo para leer y escribir archivos
const setupWebSocketServer = require("./websockets.js"); // Importa el archivo de websockets
const http = require("http"); // Importa el módulo http

// Declaramos express en una variable
const app = express();
const server = http.createServer(app); // Crea un servidor HTTP a partir de Express

// Configuraciones de express
app.use(cors({})); // Habilita CORS para todas las rutas y métodos //origin: true
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Uso de las rutas
app.use("/", RouterPrincipal);

// Lee el estado de inicialización de la base de datos desde el archivo status.json con manejo de errores
let dbStatus;
try {
  dbStatus = JSON.parse(fs.readFileSync('status.json', 'utf8'));
} catch (error) {
  console.error("Error al leer el archivo status.json:", error);
  // Asigna un valor por defecto en caso de error
  dbStatus = { dbInitialized: false };
}

// Configura la opción force en true o false según el estado
const syncOption = dbStatus.dbInitialized ? false : true;

// Configura el servidor WebSocket
const io = setupWebSocketServer(server); // Pasa el servidor HTTP al configurador de WebSocket

// Escucha del servidor
server.listen(Config.PORT, () => {
  console.log(`La app está inicializada en http://localhost:${Config.PORT}`);
  connection.sync({ force: syncOption }).then(() => {
    console.log("Conexión con la base de datos exitosa");

    // Si la base de datos fue creada por primera vez, actualiza el archivo de estado
    if (!dbStatus.dbInitialized) {
      dbStatus.dbInitialized = true;
      try {
        fs.writeFileSync('status.json', JSON.stringify(dbStatus, null, 2));
        console.log("Base de datos creada por primera vez.");
      } catch (error) {
        console.error("Error al escribir en el archivo status.json:", error);
      }
    }
  }).catch(err => {
    console.error("Error al conectar con la base de datos:", err);
  });
});
