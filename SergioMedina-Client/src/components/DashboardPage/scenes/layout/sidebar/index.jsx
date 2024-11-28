/* eslint-disable react/prop-types */
import { Avatar, Box, IconButton, Typography, useTheme } from "@mui/material";
import { useContext, useState } from "react";
import { tokens } from "../../../theme";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import {
  DashboardOutlined,
  MenuOutlined,
  ArticleOutlined,
  NewspaperOutlined,
  AttachEmailOutlined,
  SendOutlined,
  PersonAddAlt1Outlined,
  PeopleOutlined,
  LogoutOutlined,
  HomeOutlined
} from "@mui/icons-material";
import avatar from "../../../assets/images/avatar.svg";
import Item from "./Item";
import { ToggledContext } from "../../../DashboardLayout";
import { useDispatch, useSelector } from "react-redux"; // Importa useDispatch
import { logOut } from "../../../../../Redux/login/loginSlice"; // Importa la acción logOut
import { useNavigate } from "react-router-dom"; // Importa useNavigate para redirigir


const SideBar = () => {
  const userData = useSelector((state)=>state.login.userData)
  

  const [collapsed, setCollapsed] = useState(false);
  const { toggled, setToggled } = useContext(ToggledContext);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const dispatch = useDispatch(); // Inicializa el dispatch
  const navigate = useNavigate(); // Inicializa el navigate

  const handleLogout = () => {
    dispatch(logOut()); // Cambia el estado de loggedIn a false
    localStorage.removeItem("loginData"); // Elimina los datos de usuario de localStorage
    navigate("/login"); // Redirige a la página de inicio de sesión
  };

  return (
    <Sidebar
      backgroundColor={colors.primary[400]}
      rootStyles={{
        border: 0,
        height: "100%",
      }}
      collapsed={collapsed}
      onBackdropClick={() => setToggled(false)}
      toggled={toggled}
      breakPoint="md"
    >
      <Menu
        menuItemStyles={{
          button: { ":hover": { background: "transparent" } },
        }}
      >
        <MenuItem
          rootStyles={{
            margin: "10px 0 20px 0",
            color: colors.gray[100],
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {!collapsed && (
              <Box
                display="flex"
                alignItems="center"
                gap="12px"
                sx={{ transition: ".3s ease" }}
              >
              </Box>
            )}
            <IconButton onClick={() => setCollapsed(!collapsed)}>
              <MenuOutlined />
            </IconButton>
          </Box>
        </MenuItem>
      </Menu>
      {!collapsed && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
            mb: "25px",
          }}
        >
          <Avatar
            alt="avatar"
            src={avatar}
            sx={{ width: "100px", height: "100px" }}
          />
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h3" fontWeight="bold" color={colors.gray[100]}>
              {userData.nombre}
            </Typography>
            <Typography
              variant="h6"
              fontWeight="500"
              color={colors.greenAccent[500]}
            >
              {userData.cargo}
            </Typography>
          </Box>
        </Box>
      )}

      <Box mb={5} pl={collapsed ? undefined : "5%"}>
        {/* Sección de Panel de Control */}
        <Menu
          menuItemStyles={{
            button: {
              ":hover": {
                color: "#868dfb",
                background: "transparent",
                transition: ".4s ease",
              },
            },
          }}
        >
          <Item
            title="Panel de Control"
            path="/dashboard"
            colors={colors}
            icon={<DashboardOutlined />}
          />
        </Menu>

        {/* Sección de Novedades */}
        <Typography
          variant="h6"
          color={colors.gray[300]}
          sx={{ m: "15px 0 5px 20px" }}
        >
          {!collapsed ? "Novedades" : " "}
        </Typography>
        <Menu
          menuItemStyles={{
            button: {
              ":hover": {
                color: "#868dfb",
                background: "transparent",
                transition: ".4s ease",
              },
            },
          }}
        >
          <Item
            title="Administrar Novedades"
            path="/dashboard/AdministrarNovedades"
            colors={colors}
            icon={<ArticleOutlined />}
          />
          <Item
            title="Crear Novedad"
            path="/dashboard/AdministrarNovedades/Crear"
            colors={colors}
            icon={<NewspaperOutlined />}
          />
        </Menu>

        {/* Sección de Solicitudes */}
        <Typography
          variant="h6"
          color={colors.gray[300]}
          sx={{ m: "15px 0 5px 20px" }}
        >
          {!collapsed ? "Solicitudes" : " "}
        </Typography>
        <Menu
          menuItemStyles={{
            button: {
              ":hover": {
                color: "#868dfb",
                background: "transparent",
                transition: ".4s ease",
              },
            },
          }}
        >
          <Item
            title="Administrar Solicitudes"
            path="/dashboard/AdministrarSolicitudes"
            colors={colors}
            icon={<AttachEmailOutlined />}
          />
          <Item
            title="Crear Solicitud"
            path="/dashboard/AdministrarSolicitudes/Crear"
            colors={colors}
            icon={<SendOutlined />}
          />
        </Menu>
        {userData.cargo === "administrador" && (
  <>
    <Typography
      variant="h6"
      color={colors.gray[300]}
      sx={{ m: "15px 0 5px 20px" }}
    >
      {!collapsed ? "Usuarios" : " "}
    </Typography>
    <Menu
      menuItemStyles={{
        button: {
          ":hover": {
            color: "#868dfb",
            background: "transparent",
            transition: ".4s ease",
          },
        },
      }}
    >
      <Item
        title="Administrar Usuarios"
        path="/dashboard/AdministrarUsuarios"
        colors={colors}
        icon={<PersonAddAlt1Outlined />}
      />
      <Item
        title="Crear Usuario"
        path="/dashboard/AdministrarUsuarios/Crear"
        colors={colors}
        icon={<PeopleOutlined />}
      />
    </Menu>
  </>
)}


        {/* Sección de Navegación */}
        <Typography
          variant="h6"
          color={colors.gray[300]}
          sx={{ m: "15px 0 5px 20px" }}
        >
          {!collapsed ? "Navegación" : " "}
        </Typography>
        <Menu
          menuItemStyles={{
            button: {
              ":hover": {
                color: "#868dfb",
                background: "transparent",
                transition: ".4s ease",
              },
            },
          }}
        >
          <Item
            title="Ir a Página Principal"
            path="/"
            colors={colors}
            icon={<HomeOutlined />}
          />
          {/* Opción de Cerrar Sesión */}
          <MenuItem
            icon={<LogoutOutlined />}
            onClick={handleLogout} // Ejecuta handleLogout al dar clic
            rootStyles={{
              color: colors.gray[100],
              ":hover": {
                color: colors.redAccent[500], // Cambia el color al pasar el cursor
                background: "transparent",
              },
            }}
          >
            Cerrar Sesión
          </MenuItem>
        </Menu>
      </Box>
    </Sidebar>
  );
};

export default SideBar;
