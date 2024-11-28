import { Box, Typography, useTheme, Button } from "@mui/material";
import { Header } from "../../components";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from 'react-redux';
import { deleteNovedad } from '../../../../Redux/crud/novedadesSlice';
import { Edit, Delete } from "@mui/icons-material";
import { tokens } from "../../theme";
import {useNavigate} from 'react-router-dom'
import {io} from 'socket.io-client'
import Swal from 'sweetalert2'

const apiUrl = import.meta.env.VITE_API_URL;

const socket = io(apiUrl)

const AdministrarNovedades = () => {
  const navigate = useNavigate()
  const novedades = useSelector((state) => state.novedades);
  const dispatch = useDispatch(); // Agregar dispatch aquí
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  const alertaEliminar = (titulo, id) =>{
    Swal.fire({
      title: `¿Desea eliminar la novedad ${titulo}? `,
      text: "Esto no puede ser revertido",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        socket.emit("deleteNovedad", id)
        Swal.fire({
          title: "Novedad Eliminada!",
          text: `La novedad ${titulo} ha sido eliminada con exito`,
          icon: "success"
        });
      }
    });
  }

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "titulo",
      headerName: "Titulo",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "fecha",
      headerName: "Fecha",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    { field: "autor", headerName: "Creador", flex: 1 },
    {
      field: "administrar",
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
            <Button onClick={()=> navigate(`/dashboard/AdministrarNovedades/Editar/${row.id}`)}>
              <Box backgroundColor="blue" color="white" borderRadius="3px" height="35px" alignItems="center" textAlign="center">
                <Edit />
              </Box>
            </Button>
            <Button onClick={() => alertaEliminar(row.titulo, row.id)}> {/* Llamar a dispatch aquí */}
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
      <Header title="Administrar Novedades" subtitle="Las novedades del complejo educativo" />
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
          rows={novedades}
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

export default AdministrarNovedades;
