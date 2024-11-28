import React, { useState } from 'react';
import { Box, Typography, Container, Card, CardContent, CardMedia, Grid, Pagination } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const NovedadesPage = () => {
  const noticias = useSelector((state) => state.novedades); // Suponiendo que las noticias están en el estado de Redux
  const [paginaActual, setPaginaActual] = useState(1);
  const noticiasPorPagina = 8;
  const navigate = useNavigate(); // Hook para la navegación

  // Calcular el índice de inicio y fin de las noticias en la página actual
  const indiceUltimaNoticia = paginaActual * noticiasPorPagina;
  const indicePrimeraNoticia = indiceUltimaNoticia - noticiasPorPagina;

  // Filtrar las noticias según la página actual y ordenarlas de mayor a menor por ID
  const noticiasActuales = noticias
    .slice() // Hacer una copia del array original
    .sort((a, b) => b.id - a.id) // Ordenar de mayor a menor por ID
    .slice(indicePrimeraNoticia, indiceUltimaNoticia); // Obtener las noticias de la página actual

  const totalPaginas = Math.ceil(noticias.length / noticiasPorPagina);

  // Manejar el cambio de página
  const manejarCambioPagina = (event, valor) => {
    setPaginaActual(valor);
  };

  // Navegar a la página de detalles de la noticia
  const manejarClickTitulo = (id) => {
    navigate(`/noticias/${id}`);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" fontWeight="bold">
          Noticias
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Mantente al día con las últimas novedades.
        </Typography>
      </Box>

      {/* Grid de Noticias */}
      <Grid container spacing={4}>
        {noticiasActuales.map((noticia) => (
          <Grid item xs={12} sm={6} md={4} key={noticia.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 2, boxShadow: 3 }}>
              <CardMedia
                component="img"
                height="140"
                image={noticia.imagen}
                alt={noticia.titulo}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography 
                  variant="h5" 
                  component="div" 
                  onClick={() => manejarClickTitulo(noticia.id)} 
                  sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline', color: 'primary.main' }}}
                >
                  {noticia.titulo}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {new Date(noticia.fecha).toLocaleDateString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Paginación */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Pagination
          count={totalPaginas}
          page={paginaActual}
          onChange={manejarCambioPagina}
          variant="outlined"
          shape="rounded"
          color="primary"
        />
      </Box>
    </Container>
  );
};


