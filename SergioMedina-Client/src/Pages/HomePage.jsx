import React from 'react';
import { Box, Typography, Container, Card, CardContent, Button } from '@mui/material';
import { SlideShow } from '../components/HomePage/SlideShow';
import { useSelector } from 'react-redux';

export const HomePage = () => {
  const novedades = useSelector((state) => state.novedades);
  const ultimasNovedades = [...novedades]
  .sort((a, b) => b.id - a.id) // Ordenar en orden descendente por id
  .slice(0, 5); 
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      {/* Header */}
      <Box
        sx={{
          textAlign: 'center',
          mt: 4,
          mb: 4,
          color: 'primary.main',
        }}
      >
        <Typography variant="h3" fontWeight="bold">
          Bienvenido a Nuestra Plataforma
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mt: 1 }}>
          Una herramienta poderosa y eficiente para la gestión de solicitudes y novedades.
        </Typography>
      </Box>

      {/* Introduction Card */}
      <Card sx={{ mb: 4, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
        <CardContent>
          <Typography variant="body1" color="text.secondary">
            Esta plataforma ha sido diseñada para ofrecer una experiencia integral de gestión, facilitando 
            la administración de múltiples tipos de solicitudes. Aquí podrás mantenerte al tanto de las 
            últimas novedades, recibir notificaciones, y gestionar diferentes aspectos relacionados con 
            tus proyectos o áreas de interés. Nuestro objetivo es proporcionarte una herramienta que sea 
            informativa y fácil de utilizar, para que puedas enfocarte en lo importante sin complicaciones.
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
            Aprovecha al máximo todas las funcionalidades que hemos integrado para optimizar tus tareas 
            diarias y mejorar la eficiencia en tu flujo de trabajo. Estamos comprometidos en ofrecerte una 
            experiencia intuitiva y agradable, que te permitirá manejar solicitudes y procesos de forma 
            sencilla, rápida y organizada.
          </Typography>
        
        </CardContent>
      </Card>

      {/* Slideshow */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" sx={{ mb: 2, textAlign: 'center', fontWeight: 'medium' }}>
          Últimas Novedades
        </Typography>
        <SlideShow noticias={ultimasNovedades} />
      </Box>
    </Container>
  );
};
