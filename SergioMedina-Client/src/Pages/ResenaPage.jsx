import React from 'react';
import { Box, Typography, Container, Card, CardContent, Divider, Grid } from '@mui/material';


export const ResenaPage = () => {
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
              Reseña Histórica del Complejo Educativo Sergio Medina
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mt: 1 }}>
              Una mirada a nuestra rica historia y legado educativo.
            </Typography>
          </Box>
    
          {/* Descripción de la Institución */}
          <Card sx={{ mb: 4, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Descripción de la Institución Educativa
              </Typography>
              <Typography paragraph>
                • Nombre de la institución: Unidad Educativa Nacional Bolivariana Sergio Medina
              </Typography>
              <Typography paragraph>
                • A partir del 14-02-2024 cambia a Complejo Educativo “Sergio Medina”
              </Typography>
              <Typography paragraph>
                • Teléfono: 0212-8703092
              </Typography>
              <Typography paragraph>
                • Está adscrita al CDCE eje 17 Pro patria y a la Zona Educativa, del Distrito Capital.
              </Typography>
              <Typography paragraph>
                • Institución: Pública Nacional. Atiende tres Niveles de Pre-Escolar y la primera y segunda Etapa de Educación Básica.
              </Typography>
              <Typography paragraph>
                • Como vía de acceso principal, aparte del transporte urbano, para llegar al colegio existe otras alternativas, es la C.A. Metro de Caracas, a través de su estación terminal Pro-Patria.
              </Typography>
            </CardContent>
          </Card>
    
          {/* Reseña Histórica */}
          <Card sx={{ mb: 4, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Reseña Histórica
              </Typography>
              <Typography paragraph>
                La Unidad Educativa fue fundada el 14 de febrero de 1948, en una casa de la calle dos (2) de Propatria, por la Maestra Olga Sosa, quien fue su Primera Directora. Se llamaba Escuelita “Propatria” y luego se mudó en 1952 a su sede actual, adoptando el nombre del ilustre Poeta Aragüeño Sergio Medina, convirtiéndose en el Grupo Escolar Sergio Medina.
              </Typography>
              <Typography paragraph>
                La institución se destacó por sus vistosos actos, convirtiéndose en la escuela número uno en esta faceta. Algunos de los profesores que llevaron su conducción a través de los años incluyen a:
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography paragraph><strong>Directores:</strong> Olga Sosa; Dr. Publio Rojas Valderrama; Cristina de Osorio; Raquel Saud Saad; Zaida Geddler de Rojas; Rómulo García; Lic. Yolanda de Dávila; Lic. Beatriz Vásquez; Lic. Luisa Berrios; Zulay Villamizar; Angie Lara.</Typography>
                  <Typography paragraph><strong>Subdirectores:</strong> Dr. Luis Luna De La Rosa; Marco Alfonso Malave; Fridys de González; Nelly Narváez Peralta; Dra. Belkys de Machado; Lic. Deyanira de Rojas; Helena Toledo de Castro; Lic. Neuma Rivas; Lic. Migdalia Ramírez; Nancy Pérez; Angie Lara; Seir Hernández; Especialista en Educación Inicial Rosa Alejo; Especialista en Planificación de la Educación Angie Hernández.</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography paragraph><strong>Profesores destacados que trabajaron en sus aulas ya fallecidos:</strong> Elena Rubio de González +; Edgar Utera +; Silvestre Rodríguez +; Lourdes de Solórzano +; Edgar Gudiño +; Graciela Rodríguez de Polanco +; Rosa Reyes +; Hilda MiC´Till Mena +; Lic. Laura Díaz de Rosales +; Silvio Duran +; Maigualyda Pantoja +; Custodio Dimas + (Obrero); Nelly González de López + (Obrera); Roseliano Escalona + (Mayordomo).</Typography>
                  <Typography paragraph><strong>Profesores Fundadores:</strong> Nahir Casado; Jesús Leal; Mercedes de Sanabria; Amada Palma; Olga Julieta de Pascual; Margot de Manrrufo; Dra. Carmen Solórzano; Norma Massianni; Luisa de Madriz; Adela de Rondón; Carmencita Rivas; Ludmilla López; Lic. Arnedy Isabel Mejías; Marina Rojas; Lic. Olga de Fontes; Josefina de Blassi; Lic. Zulay de Robles; Norah de Rosales; Flor Kaminsky; Sara Vargas; Isolina Cacique; Cecilia Espín; Cecilia Borgas; Lic. Leydes González; Dr. Heriberto Barceló; Lic. Lourdes de Jesús; Lic. Yasmin Modesta Fuentes; Corina Palencia; María Gaeta; Esther Hernández; Elsa Bellave; Carmen de Arocha; Haidee de Echenique; Luisa Flores; Dra. Elsy Virginia Jiménez; Sonia Rivas; Blanca Villegas; Liz Urdaneta; Lic. Josefina de Urbina; Gisela Pino; Luis Briceño; Lic. María España.</Typography>
                </Grid>
              </Grid>
    
              <Typography paragraph>
                La actual directora es la Dra. En Educación Elizabeth López Brito, con la Subdirectora Académica Dra. Nairobi Mesa y la Subdirectora de Educación Inicial TSU En Educación Inicial Evelyn González.
              </Typography>
    
              <Typography paragraph>
                <strong>Descripción del Área Educativa:</strong> La institución consta de cuatro grandes edificaciones de dos y tres pisos, patios de recreo, áreas verdes, un estacionamiento lateral, y una cancha cercada de voleibol. A pesar de los años, las edificaciones se encuentran en muy buen estado, adecuadas para la labor educativa que allí se realiza.
              </Typography>
            </CardContent>
          </Card>
        </Container>
      );
    
}
