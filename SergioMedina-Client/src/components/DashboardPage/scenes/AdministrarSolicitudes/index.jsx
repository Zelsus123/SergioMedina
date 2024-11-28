import { Box, Typography, useTheme, Button } from "@mui/material";
import { Header } from "../../components";
import { DataGrid } from "@mui/x-data-grid";
import {  useSelector, useDispatch } from 'react-redux';
import { VisibilityOutlined, AccessTimeOutlined, Check } from "@mui/icons-material";
import { tokens } from "../../theme";
import {useNavigate} from 'react-router-dom'
import {io} from 'socket.io-client'
import { useEffect } from "react";
import {addSolicitud} from '../../../../Redux/crud/solicitudesSlice'

const apiUrl = import.meta.env.VITE_API_URL;

const socket = io(apiUrl)

const AdministrarSolicitudes = () => {


  const navigate = useNavigate()
  const solicitudes = useSelector((state) => state.solicitudes);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch()

  useEffect(()=>{

    socket.on("solicitudCreated", (nuevaSolicitud=>{
      dispatch(addSolicitud(nuevaSolicitud))
    }))

  }, [dispatch])

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "estudiante",
      headerName: "Estudiante",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "tipo",
      headerName: "Tipo",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    { field: "fecha", headerName: "Fecha", flex: 1 },
    { field: "procesado", headerName: "Proceso", flex: 1,
      renderCell: ({row}) =>{
        return (
          <Box
          width="40%"
          p={1}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          gap={1}
          borderRadius={1}
          color={row.procesado ? "green" : "blue"}
          title={row.procesado ? "Procesado" : "En Proceso"} // Tooltip de texto al pasar el mouse
        >
          {row.procesado ? <Check color="green" /> : <AccessTimeOutlined />}
        </Box>
        )
      }
     },
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
            justifyContent="center"
            gap={1}
            borderRadius={1}
          >
            <Button onClick={()=> navigate(`/dashboard/AdministrarSolicitudes/${row.id}`)}>
              <Box backgroundColor="#088F8F" color="white" borderRadius="3px" height="35px" width="60%" alignItems="center" textAlign="center">
                <Box marginTop="28%">

                <VisibilityOutlined/>
                </Box>
              </Box>
            </Button>
          
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header title="Administrar Solicitudes" subtitle="Observar y Procesar solicitudes de documentos" />
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
          rows={solicitudes}
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

export default AdministrarSolicitudes;
