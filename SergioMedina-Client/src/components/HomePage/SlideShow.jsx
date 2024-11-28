import React, { useState, useEffect } from 'react';
import { Box, Typography, Fade, Button, IconButton } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export const SlideShow = ({ noticias }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate =  useNavigate()

  // Cambia de imagen automáticamente cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % noticias.length);
    }, 9000);
    return () => clearInterval(interval);
  }, [noticias.length]);

  // Funciones para avanzar y retroceder manualmente
  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % noticias.length);
  };

  const handlePrevious = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? noticias.length - 1 : prevIndex - 1
    );
  };

  return (
    <Box sx={{ position: 'relative', width: '80%', margin: 'auto', mt: 4 }}>
      {noticias.map((noticia, index) => (
        <Fade
          in={index === activeIndex}
          timeout={1000}
          key={index}
          unmountOnExit
        >
          <Box
            sx={{
              position: 'absolute',
              width: '100%',
              height: '400px',
              backgroundImage: `url(${noticia.imagen})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center', // Centra el contenido verticalmente
              justifyContent: 'space-between', // Espacia los botones a los lados
              px: 2, // Espacio interno para evitar que los botones toquen el borde
            }}
          >
            <IconButton
              onClick={handlePrevious}
              sx={{
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                color: 'white',
                '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.7)' },
              }}
            >
              <ArrowBackIos />
            </IconButton>

            <Box
              sx={{
                position: 'absolute',
                bottom: '10px',
                left: '10px',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                borderRadius: '5px',
                padding: '5px 10px',
              }}
            >
              <Button
                onClick={()=>navigate(`/noticias/${noticia.id}`)}
                variant="text"
                color="inherit"
                sx={{
                  color: 'white',
                  fontWeight: 'bold',
                  textDecoration: 'none',
                }}
              >
                {noticia.titulo}
              </Button>
            </Box>

            <IconButton
              onClick={handleNext}
              sx={{
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                color: 'white',
                '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.7)' },
              }}
            >
              <ArrowForwardIos />
            </IconButton>
          </Box>
        </Fade>
      ))}
    </Box>
  );
};
