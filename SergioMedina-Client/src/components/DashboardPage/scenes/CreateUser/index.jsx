import { Box, Button, InputLabel, MenuItem, Select, TextField, useMediaQuery, FormControl } from "@mui/material";
import { Header } from "../../components";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import {addUser} from '../../../../Redux/crud/usersSlice'
import { useNavigate } from "react-router-dom";
import * as yup from "yup"
import {io} from 'socket.io-client'

const apiUrl = import.meta.env.VITE_API_URL;

const socket = io(apiUrl)

const CreateUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues = {
    nombre: "",
    ci: "",
    cargo: "",
    correo: "",
    telefono: "",
    contras: ""
  };

  const regExTelefono = /^0(416|426|424|414|412|212)\d{7}$/
  const checkoutSchema = yup.object().shape({
    nombre: yup.string().required("El nombre es requerido") ,
    ci: yup.number().required("La cedula es requerida"),
    cargo: yup.string().required("Debe seleccionar un cargo"),
    correo: yup.string().email("Ingrese una direccion de correo electronico valida").required("El correo electronico es requerido"),
    telefono: yup.string().matches(regExTelefono, "Debe ingresar un numero de telefono valido").required("El telefono es requerido"),
    contras: yup.string().required("La contraseña es requerida")
  });

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {

    
    const nuevaSolicitud = {
      ...values,
    };

    socket.emit("createUser", nuevaSolicitud)
    console.log(nuevaSolicitud);
    navigate(`/dashboard/AdministrarUsuarios`);
  };

  return (
    <Box m="20px">
      <Header title="Crear un usuario" subtitle="Crear usuarios capaces de entrar al panel del control para gestionar y/o administrar el sistema" />

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
                "& > div": {
                  gridColumn: isNonMobile ? undefined : "span 4",
                },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Nombre"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.nombre}
                name="nombre"
                error={!!touched.nombre && !!errors.nombre}
                helperText={touched.nombre && errors.nombre}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Cedula"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.ci}
                name="ci"
                error={!!touched.ci && !!errors.ci}
                helperText={touched.ci && errors.ci}
                sx={{ gridColumn: "span 1" }}
              />
              

              <FormControl fullWidth variant="filled"
                          error={!!touched.cargo && !!errors.cargo}
                          helperText={touched.cargo && errors.cargo}
               sx={{ gridColumn: "span 1" }}>
                <InputLabel id="cargo-label">Seleccione un Cargo</InputLabel>
                <Select
                  labelId="cargo-label"
                  id="cargo"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.cargo}
                  name="cargo"
      
                >
                  <MenuItem value="" disabled>
                    Seleccione un cargo
                  </MenuItem>
                  <MenuItem value="administrador">Administrador</MenuItem>
                  <MenuItem value="gestor">Gestor</MenuItem>

                </Select>
              </FormControl>
              <TextField
                fullWidth
                variant="filled"
                type="email"
                label="Correo Electronico"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.correo}
                name="correo"
                error={!!touched.correo && !!errors.correo}
                helperText={touched.correo && errors.correo}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Telefono"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.telefono}
                name="telefono"
                error={!!touched.telefono && !!errors.telefono}
                helperText={touched.telefono && errors.telefono}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Contraseña"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contras}
                name="contras"
                error={!!touched.contras && !!errors.contras}
                helperText={!!touched.contras && !!errors.contras}
                sx={{ gridColumn: "span 1" }}
              />
              
            </Box>
            <Box display="flex" alignItems="center" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Crear Usuario
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default CreateUser;
