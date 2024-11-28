const { Server } = require("socket.io");
const userController = require("./controllers/UsersControllers.js");
const NovedadesController = require("./controllers/Novedades.Controller.js");
const SolicitudesController = require("./controllers/Solicitudes.Controller.js");

function setupWebSocketServer(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: "*", // Permite todas las solicitudes de origen
      methods: ["GET", "POST"]
    }
  });

  io.on("connection", (socket) => {
    console.log("Nuevo cliente conectado:", socket.id);

    // Definir eventos personalizados
    socket.on("joinRoom", (room) => {
      socket.join(room);
      console.log(`Cliente ${socket.id} se unió a la sala ${room}`);
    });

    socket.on("requestUsers", async () => {
      console.log("Solicitud de usuarios recibida");
      try {
        const users = await userController.getUsers();
        console.log("Usuarios obtenidos:", users);
        socket.emit("receiveUsers", users);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
        socket.emit("error", "no se pudieron obtener los usuarios");
      }
    });

    socket.on("createUser", async (userData) => {
      try {
        const newUser = await userController.createUser(userData);
        io.emit("userCreated", newUser);
      } catch (error) {
        console.error(error);
      }
    });

    socket.on("loginUser", async (loginData) => {
      try {
        const response = await userController.loginUser(loginData);
        socket.emit("loginSuccess", response);
      } catch (error) {
        console.error("Error al iniciar sesión", error.message);
        socket.emit("loginError", error.message);
      }
    });

    socket.on("sendMessage", (message) => {
      console.log("Mensaje recibido:", message);
      io.emit("receiveMessage", message);
    });

    socket.on("deleteUser", async (userId) => {
      try {
        await userController.deleteUser(userId);
        io.emit("deletedUser", userId);
      } catch (error) {
        console.error(error);
      }
    });

    socket.on("updateUser", async (id, userData) => {
      try {
        const updatedUser = await userController.updateUser(id, userData);
        io.emit("userUpdated", updatedUser);
      } catch (error) {
        console.error("Error al actualizar el usuario:", error.message);
        socket.emit("error", { message: error.message });
      }
    });

    socket.on("requestNovedades", async () => {
      try {
        const novedades = await NovedadesController.getNovedades();
        socket.emit("receiveNovedades", novedades);
      } catch (error) {
        console.error("Error al obtener las novedades:", error);
        socket.emit("error", "no se pudieron obtener las novedades");
      }
    });

    socket.on("createNovedad", async (novedadData) => {
      try {
        const newNovedad = await NovedadesController.createNovedad(novedadData);
        io.emit("novedadCreated", newNovedad);
      } catch (error) {
        console.error(error);
      }
    });

    socket.on("deleteNovedad", async (novedadId) => {
      try {
        await NovedadesController.deleteNovedad(novedadId);
        io.emit("deletedNovedad", novedadId);
      } catch (error) {
        console.error(error);
      }
    });

    socket.on("updateNovedad", async (id, novedadData) => {
      try {
        const updatedNovedad = await NovedadesController.updateNovedad(id, novedadData);
        io.emit("novedadUpdated", updatedNovedad);
      } catch (error) {
        console.error("Error al actualizar la novedad:", error.message);
        socket.emit("error", { message: error.message });
      }
    });

    socket.on("requestSolicitudes", async () => {
      try {
        const solicitudes = await SolicitudesController.getSolicitudes();
        socket.emit("receiveSolicitudes", solicitudes);
      } catch (error) {
        console.error("Error al obtener las solicitudes:", error);
        socket.emit("error", "no se pudieron obtener las solicitudes");
      }
    });

    socket.on("createSolicitud", async (solicitudData) => {
      try {
        const newSolicitud = await SolicitudesController.createSolicitud(solicitudData);
        io.emit("solicitudCreated", newSolicitud);
      } catch (error) {
        console.error(error);
      }
    });

    socket.on("disconnect", () => {
      console.log("Cliente desconectado:", socket.id);
    });
  });

  return io;
}

module.exports = setupWebSocketServer;
