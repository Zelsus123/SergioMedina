import { Box, Button, MenuItem, Select, TextField, useMediaQuery } from "@mui/material";
import { Header } from "../../components";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { processSolicitud } from "../../../../Redux/crud/solicitudesSlice";
import { useParams, useNavigate } from "react-router-dom";


const ViewSolicitud = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const solicitudes = useSelector((state)=> state.solicitudes)

  const solicitud = solicitudes.find((solicitud)=> solicitud.id === parseInt(id))
  const initialValues = solicitud
  ? {
    id: 1,
    estudiante: solicitud.estudiante,
    seccion: solicitud.seccion,
    turno: solicitud.turno,
    periodo: solicitud.periodo,
    fecha: solicitud.fecha,
    tipo: solicitud.tipo ? solicitud.tipo : "Prueba"    ,
    representante: solicitud.representante,
    correo: solicitud.correo,
    nacido: solicitud.nacido,
    edad: solicitud.edad,
    cedula: solicitud.cedula,
    procesado: solicitud.procesado ? "Procesado con exito" : "En proceso",
    curso: solicitud.curso,
    }
  : {
    id:"",
    estudiante:"",
    seccion: "",
    turno: "",
    periodo: "",
    fecha: "",
    tipo: "",
    representante: "",
    correo: "",
    nacido: "",
    edad: "",
    cedula: "",
    procesado: "",
    curso: ""
    };
  

  

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const handleFormSubmit = (values, actions) => {
    console.log(values);
    const processedSolicitud = {
      id: parseInt(id),
    }
    dispatch(processSolicitud(processedSolicitud))
    navigate(`/dashboard/AdministrarSolicitudes`)
  };
  return (
    <Box m="20px">
      <Header title={ solicitud ? `Solicitud ${id}` : "No se ha encontrado la solicitud"} subtitle="Ver detalles de la solicitud y procesarla" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
      
      >
        {({
          values,
            handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": {
                  gridColumn: isNonMobile ? undefined : "span 4",
                },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Estudiante"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.estudiante}
                name="estudiante"
                sx={{
                  gridColumn: "span 2",
                }}
                inputProps={{readOnly: true}}
              />
               <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Representante"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.representante}
                name="representante"
                                sx={{ gridColumn: "span 1" }}
                                inputProps={{readOnly: true}}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Edad Estudiante"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.edad}
                name="edad"
                                sx={{ gridColumn: "span 1" }}
                                inputProps={{readOnly: true}}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Curso"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.curso}
                name="curso"
                                sx={{ gridColumn: "span 1" }}
                                inputProps={{readOnly: true}}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Sección"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.seccion}
                name="seccion"
                                sx={{ gridColumn: "span 1" }}
                                inputProps={{readOnly: true}}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Periodo"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.periodo}
                name="periodo"
                                sx={{ gridColumn: "span 1" }}
                                inputProps={{readOnly: true}}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Turno"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.turno}
                name="turno"
                                sx={{ gridColumn: "span 1" }}
                                inputProps={{readOnly: true}}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Nacido en"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.nacido}
                name="nacido"
                                sx={{ gridColumn: "span 1" }}
                                inputProps={{readOnly: true}}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Cedula / Cedula Estudiantil"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.cedula}
                name="cedula"
                                sx={{ gridColumn: "span 1" }}
                                inputProps={{readOnly: true}}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Tipo de Solicitud"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.tipo}
                name="tipo"
                                sx={{ gridColumn: "span 1" }}
                                inputProps={{readOnly: true}}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Fecha de Solicitud"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.fecha}
                name="fecha"
                                sx={{ gridColumn: "span 1" }}
                                inputProps={{readOnly: true}}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Correo electronico donde fue enviado el documento"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.correo}
                name="correo"
                                sx={{ gridColumn: "span 2" }}
                                inputProps={{readOnly: true}}                                
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Estado de la solicitud"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.procesado}
                name="procesado"
                               sx={{ gridColumn: "span 2" }}
                               inputProps={{readOnly: true}}
              />
   
            </Box>
            <Box display="flex" alignItems="center" justifyContent="end" mt="20px">
  <Button
    type="submit"
    color="secondary"
    variant="contained"
    disabled={values.procesado === "Procesado con exito"}
  >
    {values.procesado === "Procesado con exito" ? "Solicitud Procesada" : "Procesar Solicitud"}
  </Button>
</Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default ViewSolicitud;
