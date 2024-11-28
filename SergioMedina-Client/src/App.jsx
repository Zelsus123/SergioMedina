import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Router } from './Router/Router';
import { DashboardRouter } from './Router/DashboardRouter';
import { Layout } from './components/LayoutComponents/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from './Redux/login/loginSlice';
import { storeUsers } from './Redux/crud/usersSlice';
import { storeSolicitudes } from './Redux/crud/solicitudesSlice';
import { storeNovedades, addNovedad, deleteNovedad, editNovedad } from './Redux/crud/novedadesSlice';
import { io } from 'socket.io-client';

const apiUrl = import.meta.env.VITE_API_URL;

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    // Conexión automática al servidor WebSocket
    const socket = io(apiUrl, {
      autoConnect: true,
    });

    socket.on("connect", () => {
      console.log("Conectado al servidor websocket");

      // Solicitar usuarios y novedades al conectar
      socket.emit("requestUsers");
      socket.emit("requestNovedades");
      socket.emit("requestSolicitudes");
    });

    // Definir las funciones de callback para los eventos
    const handleReceiveUsers = (data) => {
      console.log("Recibiendo usuarios");
      dispatch(storeUsers(data));
    };

    const handleReceiveNovedades = (data) => {
      console.log("Recibiendo novedades");
      dispatch(storeNovedades(data));
    };

    const handleNovedadCreated = (data) => {
      console.log("Novedad creada:", data);
      dispatch(addNovedad(data));
    };

    const handleUsersListUpdated = (data) => {
      dispatch(storeUsers(data));
    };

    const handleDeletedNovedad = (novedadId) => {
      dispatch(deleteNovedad(novedadId));
    };

    const handleUpdateNovedad = (updatedNovedadData) => {
      dispatch(editNovedad(updatedNovedadData));
    };

    const handleReceiveSolicitudes = (data) => {
      dispatch(storeSolicitudes(data));
    };

    // Escuchar los eventos
    socket.on("receiveUsers", handleReceiveUsers);
    socket.on("receiveNovedades", handleReceiveNovedades);
    socket.on("novedadCreated", handleNovedadCreated);
    socket.on("usersListUpdated", handleUsersListUpdated);
    socket.on("deletedNovedad", handleDeletedNovedad);
    socket.on("novedadUpdated", handleUpdateNovedad);
    socket.on("receiveSolicitudes", handleReceiveSolicitudes);

    // Limpiar los eventos al desmontar
    return () => {
      socket.off("receiveUsers", handleReceiveUsers);
      socket.off("receiveNovedades", handleReceiveNovedades);
      socket.off("novedadCreated", handleNovedadCreated);
      socket.off("usersListUpdated", handleUsersListUpdated);
      socket.off("deletedNovedad", handleDeletedNovedad);
      socket.off("novedadUpdated", handleUpdateNovedad);
      socket.off("receiveSolicitudes", handleReceiveSolicitudes);
      socket.disconnect(); // Asegúrate de desconectar el socket al desmontar
    };
  }, [dispatch, apiUrl]);

  useEffect(() => {
    const storedUser = localStorage.getItem("loginData");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      dispatch(loginUser(userData));
    }
  }, [dispatch]);

  const loggedIn = useSelector((state) => state.login.loggedIn);

  const renderContent = () => {
    if (location.pathname.includes("/dashboard") && loggedIn === true) {
      return <DashboardRouter />;
    } else if (location.pathname.includes("/login")) {
      return <Router />;
    } else {
      return (
        <Layout>
          <Router />
        </Layout>
      );
    }
  };

  return renderContent();
}

export default App;
