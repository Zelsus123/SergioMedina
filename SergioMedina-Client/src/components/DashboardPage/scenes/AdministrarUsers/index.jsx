import { Box, Typography, useTheme, Button } from "@mui/material";
import { Header } from "../../components";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from 'react-redux';
import { addUser, deleteUser, editUser } from '../../../../Redux/crud/usersSlice';
import { Edit, Delete } from "@mui/icons-material";
import { tokens } from "../../theme";
import {useNavigate} from 'react-router-dom'
import Swal from "sweetalert2"
import { useEffect } from "react";
import { io } from 'socket.io-client';

const apiUrl = import.meta.env.VITE_API_URL;
const socket = io(apiUrl);

const AdministrarUsers = () => {



  const navigate = useNavigate()
  const usuarios = useSelector((state) => state.usuarios);
  const dispatch = useDispatch(); // Agregar dispatch aquí
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    socket.on('userCreated', (nuevoUsuario) => {
        console.log('Usuario recibido en cliente:', nuevoUsuario);
        dispatch(addUser(nuevoUsuario)); // Actualiza el estado de Redux
    });

    socket.on("deletedUser", (userId)=>{
      dispatch(deleteUser(userId))
    })

    socket.on("userUpdated", (updatedUser)=>{
      dispatch(editUser(updatedUser))
    })

    // Limpiar el evento cuando el componente se desmonte
    return () => {
        socket.off('userCreated'); // Asegúrate de eliminar el listener
    };
}, [dispatch]);


  const alertaEliminar = (id, nombre, cargo)=>{
    Swal.fire({
      title: `¿Desea eliminar el ${cargo} ${nombre}? `,
      text: "Esto no puede ser revertido",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        socket.emit("deleteUser", id)
        Swal.fire({
          title: "¡Usuario Eliminado!",
          text: `El usuario ${id} ha sido eliminado con exito`,
          icon: "success"
        });
      }
    });
  }

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "nombre",
      headerName: "Nombre",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "ci",
      headerName: "Cedula",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    { field: "correo", headerName: "Correo", flex: 1 },
    { field: "cargo", headerName: "Cargo", flex: 1 },
    {
      field: "Administrar",
      headerName: "Administrar",
      flex: 1,
      renderCell: ({ row }) => { // Cambia esto a { row }
        return (
          <Box
            width="40%"
            p={1}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            gap={1}
            borderRadius={1}
          >
            <Button onClick={()=> navigate(`/dashboard/AdministrarUsuarios/Editar/${row.id}`)}>
              <Box backgroundColor="blue" color="white" borderRadius="3px" height="35px" alignItems="center" textAlign="center">
                <Edit />
              </Box>
            </Button>
            <Button onClick={() => alertaEliminar(row.id, row.nombre, row.cargo)}> {/* Llamar a dispatch aquí */}
              <Box backgroundColor="red" color="white" borderRadius="3px" height="35px" alignItems="center" textAlign="center">
                <Delete />
              </Box>
            </Button>
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header title="Administrar Usuarios" subtitle="Centro de administracion de usuarios" />
      <Box
        mt="40px"
        height="75vh"
        flex={1}
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            border: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-iconSeparator": {
            color: colors.primary[100],
          },
        }}
      >
        <DataGrid
          rows={usuarios}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default AdministrarUsers;
