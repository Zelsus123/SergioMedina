import React from 'react';
import { Box, Typography, Container, Card, CardMedia } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const NovedadDetailPage = () => {
  const { id } = useParams(); // Obtiene el parámetro :id de la URL
  const noticias = useSelector((state) => state.novedades); // Obtener las noticias del estado de Redux
  const noticia = noticias.find((n) => n.id === parseInt(id)); // Buscar la noticia por id

  if (!noticia) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h5" color="text.secondary" textAlign="center">
          Noticia no encontrada.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
        <CardMedia
          component="img"
          height="300"
          image={noticia.imagen}
          alt={noticia.titulo}
          sx={{ objectFit: 'cover' }}
        />
        <Box sx={{ padding: 3 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {noticia.titulo}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {new Date(noticia.fecha).toLocaleDateString()} | {noticia.autor}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {noticia.contenido}
          </Typography>
        </Box>
      </Card>
    </Container>
  );
};


