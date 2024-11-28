import React from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Box, Divider, Typography, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { NavBar } from './NavBar';
import { Dashboard } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const Header = () => {
  // Acceder a `loggedIn` como valor booleano desde el estado de Redux
  const loggedIn = useSelector((state) => state.login.loggedIn);
  const userName = useSelector((state)=>state.login.userData.nombre)
  
  return (
    <Box component="div" sx={{
        backgroundColor:"#0D4F91",
        width:"100%",
        height:"330px",
        color: "#fff",
        display:"flex",
        flexDirection: "column",
        overflow:"hidden"
      }}>
      
      <Box sx={{ display: "flex", flexDirection: "row", paddingLeft: "15px", paddingTop: "0.2%", gap: "10px", height: "17%", paddingBottom: "5px" }}>
        <Box sx={{ width: "200px", height: "60px", overflow: "hidden" }}>
          <img src='/GobiernoBolivariano.png' style={{ width: "200px", height: "60px" }} alt="Gobierno Bolivariano" />
        </Box>
        <Divider orientation='vertical' sx={{ backgroundColor: "#fff", height: "50px", paddingTop: "10px", width: "2px" }} />
        <Box sx={{ width: "200px", height: "60px", overflow: "hidden", display: "flex", flexDirection: "column", color: "#fff", paddingTop: "15px" }}>
          <Typography variant='h1' component='h2' sx={{ fontSize: "20px", fontWeight: "bold" }}>
            Ministerio del
          </Typography>
          <Typography variant='h1' component='h2' sx={{ fontSize: "12px", fontWeight: "bold" }}>
            Poder Popular para la Educación
          </Typography>
        </Box>

        {/* Condicional para mostrar el enlace de "Panel de Control" o "Iniciar Sesión" */}
        {loggedIn ? (
          <Link to={"/dashboard"} style={{ textDecoration: "none", color: 'inherit', gap: 0 }} key="dashboard">
            <ListItemButton sx={{ backgroundColor: "inherit", borderRadius: "5px" }}>
              <ListItemIcon sx={{ color: "#fff", justifyContent: "center" }}>
                <Dashboard />
              </ListItemIcon>
              <ListItemText primary="Panel de Control" />
            </ListItemButton>
          </Link>
        ) : (
          <Link to={"/login"} style={{ textDecoration: "none", color: 'inherit', gap: 0 }} key="login">
            <ListItemButton sx={{ backgroundColor: "inherit", borderRadius: "5px" }}>
              <ListItemIcon sx={{ color: "#fff", justifyContent: "center" }}>
                <Dashboard />
              </ListItemIcon>
              <ListItemText primary="Iniciar Sesión" />
            </ListItemButton>
          </Link>
        )}
        {
          loggedIn ? 
          <Box sx={{marginLeft: "35%",
            alignContent:"center"
          }}>
          Hola, {userName}
        </Box> : ""
          }
      </Box>

      <Box sx={{ width: "100%", height: "60%", backgroundImage: "url(/sergiomedina.JPG)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img src="/sergiomedina.JPG" style={{ width: "100%", height: "100%", objectFit: 'cover' }} alt="Sergio Medina" />
        <Box sx={{ border: "5px solid white", position: "absolute", top: "17%", left: "3%", width: "350px", height: "90px" }}>
          <Typography sx={{ color: "#fff", fontWeight: "bold", fontSize: "30px", paddingLeft: "5px", width: "500px" }}>COMPLEJO EDUCATIVO</Typography>
          <Typography sx={{ color: "#fff", fontWeight: "bold", fontSize: "30px", paddingLeft: "5px" }}>SERGIO MEDINA</Typography>
        </Box>
      </Box>
      
      <Box>
      
        <NavBar />
      </Box>
    </Box>
  );
};
