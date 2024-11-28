import React from "react";
import {
  Box,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Header,
  StatBox,
  BarChart,
} from "../../components";
import {
  Email,
  Print,
  PendingActions,
} from "@mui/icons-material";
import { tokens } from "../../theme";
import { useSelector } from "react-redux";

function Dashboard() {
  const novedades = useSelector((state) => state.novedades);
  const newSort = [...novedades].sort((a, b) => b.id - a.id).slice(0, 3); // Copia para evitar el error de readonly
  const solicitudes = useSelector((state)=> state.solicitudes);  
  const solicitudesProcesadas = solicitudes.filter((solicitud)=> solicitud.procesado === true)
  const solicitudesSinProcesar = solicitudes.filter((solicitud)=> solicitud.procesado === false)
    const totalSolicitudesProcesadas = Math.round(solicitudesProcesadas.length / solicitudes.length * 100)
    const totalSolicitudesSinProcesar = Math.round(solicitudesSinProcesar.length / solicitudes.length * 100)
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isXlDevices = useMediaQuery("(min-width: 1260px)");
  const isMdDevices = useMediaQuery("(min-width: 724px)");
  const isXsDevices = useMediaQuery("(max-width: 436px)");

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between">
        <Header title="Sergio Medina" subtitle="Sistema Administrativo" />
        {!isXsDevices && <Box></Box>}
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns={
          isXlDevices
            ? "repeat(12, 1fr)"
            : isMdDevices
            ? "repeat(6, 1fr)"
            : "repeat(3, 1fr)"
        }
        gridAutoRows="140px"
        gap="20px"
      >
        {/* Statistic Items */}
        <Box
          gridColumn="span 3"
          bgcolor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={solicitudes.length}
            subtitle="Solicitudes Recibidas"
            progress="100"
    
            icon={<Email sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={solicitudesProcesadas.length}
            subtitle="Solicitudes Procesadas"
            progress={totalSolicitudesProcesadas/100}
            increase={`${totalSolicitudesProcesadas}%`}
            icon={<Print sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={solicitudesSinProcesar.length}
            subtitle="Solicitudes Pendientes"
            progress={totalSolicitudesSinProcesar/100}
            increase={`${totalSolicitudesSinProcesar}%`}
            icon={<PendingActions sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
          />
        </Box>

        {/* ---------------- Row 2 ---------------- */}

        {/* Line Chart */}
        <Box
          gridColumn={isXlDevices ? "span 8" : isMdDevices ? "span 6" : "span 3"}
          gridRow="span 2"
          bgcolor={colors.primary[400]}
        >
          <Box mt="25px" px="30px" display="flex" justifyContent="space-between">
            <Box>
              <Typography variant="h5" fontWeight="600" color={colors.gray[100]}>
                Diferentes Solicitudes
              </Typography>
              <Typography variant="h5" fontWeight="bold" color={colors.greenAccent[500]}>
                Total:
              </Typography>
            </Box>
          </Box>
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
        </Box>

        {/* Transaction Data */}
        <Box
          gridColumn={isXlDevices ? "span 4" : "span 3"}
          gridRow="span 2"
          bgcolor={colors.primary[400]}
          overflow="auto"
        >
          <Box borderBottom={`4px solid ${colors.primary[500]}`} p="15px">
            <Typography color={colors.gray[100]} variant="h5" fontWeight="600">
              Últimas Novedades
            </Typography>
          </Box>

          {newSort.map((novedad) => {
            const date = new Date(novedad.fecha); // Convierte la cadena a objeto Date
            const formattedDate = date.toLocaleDateString('es-ES'); // Formato de fecha en español

            return (
              <Box
                key={novedad.id}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                borderBottom={`4px solid ${colors.primary[500]}`}
                p="15px"
              >
                <Box>
                  <Typography color={colors.greenAccent[500]} variant="h5" fontWeight="600">
                    {novedad.titulo}
                  </Typography>
                  <Typography color={colors.gray[100]}>
                    {novedad.autor}
                  </Typography>
                </Box>
                <Typography color={colors.gray[100]}>
                  {formattedDate} {/* Muestra la fecha formateada */}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard;
