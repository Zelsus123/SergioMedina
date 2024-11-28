import React, { useEffect } from 'react';
import { SchoolOutlined } from '@mui/icons-material';
import { TextField, Button, Box, Typography, Icon, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as yup from "yup";
import { useDispatch } from 'react-redux';
import { loginUser } from '../../Redux/login/loginSlice';
import { io } from 'socket.io-client';

const apiUrl = import.meta.env.VITE_API_URL;
const socket = io(apiUrl);

export const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    ci: "",
    contras: ""
  };

  const checkoutSchema = yup.object().shape({
    ci: yup.number().required("La cédula es requerida"),
    contras: yup.string().required("La contraseña es requerida")
  });

  useEffect(() => {
    socket.on("loginSuccess", (response) => {
      alert("Inicio de sesión exitoso");
      dispatch(loginUser(response.user));
      localStorage.setItem('loginData', JSON.stringify(response.user));
      navigate("/"); // Redirige a la página de administración
    });

    socket.on("loginError", (errorMessage) => {
      alert(`Error: ${errorMessage}`);
    });

    // Cleanup del socket al desmontar el componente
    return () => {
      socket.off("loginSuccess");
      socket.off("loginError");
    };
  }, [dispatch, navigate]);

  const handleFormSubmit = (values) => {
   socket.emit("loginUser", values);
    
  };

  const isNonMobile = useMediaQuery("(min-width:600px)");

  return (
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
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100vh"
            bgcolor="background.default"
            sx={{
              backgroundImage: 'url(/bg-01.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <Box
              sx={{
                p: 4,
                maxWidth: 400,
                width: '100%',
                bgcolor: 'white',
                borderRadius: 2,
                boxShadow: 3,
                textAlign: 'center',
              }}
            >
              <Icon sx={{ fontSize: 80, mb: 2, color: 'primary.main' }}>
                <SchoolOutlined />
              </Icon>

              <Typography variant="h5" mb={2}>
                Sistema Web Sergio Medina
              </Typography>

              <Box>
                <TextField
                  label="Cédula de Identidad"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="ci"
                  value={values.ci}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={!!touched.ci && !!errors.ci}
                  helperText={touched.ci && errors.ci}
                />

                <TextField
                  label="Contraseña"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="contras"
                  value={values.contras}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  error={!!touched.contras && !!errors.contras}
                  helperText={touched.contras && errors.contras}
                />

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  Iniciar Sesión
                </Button>

                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => { navigate("/") }}
                  sx={{
                    mt: 2,
                    color: '#white',
                    borderColor: '#92000A',
                    backgroundColor: "#92000A",
                    '&:hover': {
                      backgroundColor: '#7C3030',
                      color: '#white',
                    },
                  }}
                >
                  Volver
                </Button>
              </Box>
            </Box>
          </Box>
        </form>
      )}
    </Formik>
  );
};
