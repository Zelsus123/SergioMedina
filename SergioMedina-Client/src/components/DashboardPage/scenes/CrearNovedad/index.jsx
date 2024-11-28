import { Box, Button, TextField, useMediaQuery } from "@mui/material";
import { Header } from "../../components";
import { Formik } from "formik";
import * as yup from "yup";
import {useDispatch, useSelector} from 'react-redux'
import {addNovedad} from '../../../../Redux/crud/novedadesSlice'
import { useNavigate } from "react-router-dom";
import {io} from 'socket.io-client'

const apiUrl = import.meta.env.VITE_API_URL;

const socket = io(apiUrl)



const CrearNovedad = () => {

  const navigate = useNavigate()

  const userData = useSelector((state)=>state.login.userData)

  const fechaactual = new Date().toString()

const initialValues = {
  titulo: "",
  contenido: "",
  imagen: "",
  autor: userData.nombre,
  fecha: fechaactual
};


const checkoutSchema = yup.object().shape({
  titulo: yup.string().required("Requerido"),
  contenido: yup.string().required("Requerido"),
  imagen: yup.string().matches(/((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
            'No es una URL')
  
});

  const dispatch = useDispatch()
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const handleFormSubmit = (values, actions) => {
    const nuevaNovedad = {
      ...values,
    }
    socket.emit("createNovedad", nuevaNovedad)
    console.log(nuevaNovedad)
    navigate('/dashboard/AdministrarNovedades')
  };
  return (
    <Box m="20px">
      <Header title="Crear Noticia" subtitle="Crea una noticia para que los representantes la vean" />

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
                label="Titulo"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.titulo}
                name="titulo"
                error={!!touched.titulo && !!errors.titulo}
                helperText={touched.titulo && errors.titulo}
                sx={{
                  gridColumn: "span 2",
                }}
              />
            
              <TextField
                fullWidth
                variant="filled"
                type="text"
                multiline
                rows={8}
                label="Contenido"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contenido}
                name="contenido"
                error={!!touched.contenido && !!errors.contenido}
                helperText={touched.contenido && errors.contenido}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Link de la Imagen"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.imagen}
                name="imagen"
                error={!!touched.imagen && !!errors.imagen}
                helperText={touched.imagen && errors.imagen}
                sx={{ gridColumn: "span 4" }}
              />
              
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="end"
              mt="20px"
            >
              <Button type="submit" color="secondary" variant="contained">
                Crear Noticia
              </Button>
            </Box>
          </form>
        )}
      </Formik>
      <br/>
      <br/>
      <Box>
        Para subir la imagen se recomienda usar <a href="https://imgbb.com/" target="_blank">Este</a> hosting de imagenes, copiar el link de la imagen y pegarlo en el campo correspondiente
      </Box>
    </Box>
  );
};

export default CrearNovedad;
