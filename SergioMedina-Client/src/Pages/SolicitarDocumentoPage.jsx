import { Box, Button, InputLabel, MenuItem, Select, TextField, useMediaQuery, FormControl } from "@mui/material";
import {Header} from '../components/DashboardPage/components'
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import {addSolicitud} from '../Redux/crud/solicitudesSlice'

import Swal from 'sweetalert2'
import * as yup from 'yup'

export const SolicitarDocumentoPage = () => {

    const checkoutSchema = yup.object().shape({
        estudiante: yup.string().required("Campo Requerido"),
        representante: yup.string().required("Campo Requerido"),
        edad: yup.number().required("Campo Requerido"),
        curso: yup.string().required("Campo Requerido"),
        seccion: yup.string().required("Campo Requerido"),
        periodo: yup.string().required("Campo Requerido"),
        turno: yup.string().required("Campo Requerido"),
        nacido: yup.string().required("Campo Requerido"),
        cedula: yup.string().required("Campo Requerido"),
        tipo: yup.string().required("Campo Requerido"),
        correo: yup.string().email("Ingresa un email valido").required("Campo Requerido"),
      });

    const dispatch = useDispatch();
  
    const initialValues = {
      estudiante: "",
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
      procesado: false,
      curso: ""
    };
  
    const isNonMobile = useMediaQuery("(min-width:600px)");
  
    const handleFormSubmit = (values, actions) => {
      const currentDate = new Date();
      const formattedDate = `${String(currentDate.getDate()).padStart(2, '0')}/${String(currentDate.getMonth() + 1).padStart(2, '0')}/${currentDate.getFullYear()}`;
      
      const nuevaSolicitud = {
        ...values,
        fecha: formattedDate
      };
  
      console.log(nuevaSolicitud);
      dispatch(addSolicitud(nuevaSolicitud))
      Swal.fire({
        title: "Solicitud Enviada",
        text: `Revise su correo electronico ${values.correo}`,
        icon: "success"
      });
      actions.resetForm({
        values: initialValues
      })
      
      ;
    };
  
    return (
      <Box m="20px">
        <Header title="Solicita un Documento"   />
  
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={checkoutSchema}
        >
          {({
            values,
            errors,
            touched,
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
                    marginTop:"80px",
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
                  error={touched.estudiante && errors.estudiante}
                  helperText={touched.estudiante && errors.estudiante}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Representante"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.representante}
                  error={touched.representante && errors.representante}
                  helperText={touched.representante && errors.representante}
                  name="representante"
                  sx={{ gridColumn: "span 1" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="number"
                  label="Edad Estudiante"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.edad}
                  error={touched.edad && errors.edad}
                  helperText={touched.edad && errors.edad}
                  name="edad"
                  sx={{ gridColumn: "span 1" }}
                />
                <FormControl fullWidth variant="filled" sx={{ gridColumn: "span 1" }}>
                  <InputLabel id="curso-label">Seleccione un curso</InputLabel>
                  <Select
                    labelId="curso-label"
                    id="curso"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.curso}
                    error={touched.curso && errors.curso}
                  helperText={touched.curso && errors.curso}
                    name="curso"
                  >
                    <MenuItem value="" disabled>
                      Seleccione un curso
                    </MenuItem>
                    <MenuItem value="1er">Primer Grado</MenuItem>
                    <MenuItem value="2do">Segundo Grado</MenuItem>
                    <MenuItem value="3er">Tercer Grado</MenuItem>
                    <MenuItem value="4to">Cuarto Grado</MenuItem>
                    <MenuItem value="5to">Quinto Grado</MenuItem>
                    <MenuItem value="6to">Sexto Grado</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Sección"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.seccion}
                  name="seccion"
                  error={touched.seccion && errors.seccion}
                  helperText={touched.seccion && errors.seccion}
                  sx={{ gridColumn: "span 1" }}
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
                  error={touched.periodo && errors.periodo}
                  helperText={touched.periodo && errors.periodo}
                  sx={{ gridColumn: "span 1" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Turno"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.turno}
                  error={touched.turno && errors.turno}
                  helperText={touched.turno && errors.turno}
                  name="turno"
                  sx={{ gridColumn: "span 1" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Nacido en"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.nacido}
                  error={touched.nacido && errors.nacido}
                  helperText={touched.nacido && errors.nacido}
                  name="nacido"
                  sx={{ gridColumn: "span 1" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Cedula / Cedula Estudiantil"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.cedula}
                  error={touched.cedula && errors.cedula}
                  helperText={touched.cedula && errors.cedula}
                  name="cedula"
                  sx={{ gridColumn: "span 1" }}
                />
                <FormControl fullWidth variant="filled" sx={{ gridColumn: "span 1" }}>
                  <InputLabel id="tipo-label">Seleccione un documento</InputLabel>
                  <Select
                    labelId="tipo-label"
                    id="tipo"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.tipo}
                    error={touched.tipo && errors.tipo}
                  helperText={touched.tipo && errors.tipo}
                    name="tipo"
                  >
                    <MenuItem value="" disabled>
                      Seleccione un Documento
                    </MenuItem>
                    <MenuItem value="acta de compromiso">Acta de Compromiso</MenuItem>
                    <MenuItem value="constancia de estudio">Constancia de estudio</MenuItem>
                    <MenuItem value="culminacion de estudios">Constancia de culminación de estudios</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  fullWidth
                  variant="filled"
                  type="email"
                  label="Correo electrónico"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.correo}
                  name="correo"
                  error={touched.correo && errors.correo}
                  helperText={touched.correo && errors.correo}
                  sx={{ gridColumn: "span 2" }}
                />
              </Box>
              <Box display="flex" alignItems="center" justifyContent="end" mt="20px">
                <Button type="submit" color="secondary" variant="contained">
                  Crear Solicitud
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    );
  };