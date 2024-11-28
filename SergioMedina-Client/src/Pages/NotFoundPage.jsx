// Pages/NotFoundPage.jsx
import React from 'react';
import { Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', marginTop: 10 }}>
      <Box>
        <Typography variant="h1" color="primary" fontWeight="bold">
          404
        </Typography>
        <Typography variant="h4" color="textSecondary" gutterBottom>
          Página no encontrada
        </Typography>
        <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
          Lo sentimos, la página que buscas no existe. Puede que la URL sea incorrecta o que la página haya sido eliminada.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<HomeIcon />}
          onClick={() => navigate('/')}
          sx={{
            padding: '10px 20px',
            fontWeight: 'bold',
            fontSize: '16px',
            borderRadius: '8px',
          }}
        >
          Volver al inicio
        </Button>
      </Box>
    </Container>
  );
}
