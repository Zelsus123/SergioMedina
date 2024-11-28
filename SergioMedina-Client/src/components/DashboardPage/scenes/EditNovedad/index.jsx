import { Box, Button, TextField, useMediaQuery } from "@mui/material";
import { Header } from "../../components";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { editNovedad } from "../../../../Redux/crud/novedadesSlice";
import { useParams, useNavigate } from "react-router-dom";
import { io } from 'socket.io-client';

const apiUrl = import.meta.env.VITE_API_URL;
const socket = io(apiUrl);

const EditarNovedad = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const novedades = useSelector((state) => state.novedades);
  const novedad = novedades.find((novedad) => novedad.id === parseInt(id));

  const initialValues = novedad
    ? {
        titulo: novedad.titulo,
        contenido: novedad.contenido,
        imagen: novedad.imagen,
        autor: novedad.autor,
        fecha: novedad.fecha,
      }
    : {
        titulo: "",
        contenido: "",
        imagen: "",
        autor: "",
        fecha: "",
      };

  const checkoutSchema = yup.object().shape({
    titulo: yup.string().required("Requerido"),
    contenido: yup.string().required("Requerido"),
    imagen: yup
      .string()
      .matches(
        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        "No es una URL"
      ),
  });

  const handleFormSubmit = (values) => {
    const editedNovedad = {
      id: parseInt(id), // el id del elemento a editar
      titulo: values.titulo,
      contenido: values.contenido,
      imagen: values.imagen,
      autor: values.autor,
      fecha: values.fecha,
    };

    // Emitir el evento al servidor para actualizar la novedad
    socket.emit("updateNovedad", editedNovedad);


    // Redirige después de editar
    navigate("/dashboard/AdministrarNovedades");
  };

  return (
    <Box m="20px">
      <Header title="Modificar Noticia" subtitle="Realiza alguna modificación" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
        enableReinitialize
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
            <Box display="flex" alignItems="center" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Modificar Noticia
              </Button>
            </Box>
          </form>
        )}
      </Formik>
      <br />
      <Box>
        Para subir la imagen se recomienda usar{" "}
        <a href="https://imgbb.com/" target="_blank" rel="noopener noreferrer">
          este hosting
        </a>{" "}
        de imágenes, copiar el link de la imagen y pegarlo en el campo correspondiente.
      </Box>
    </Box>
  );
};

export default EditarNovedad;
