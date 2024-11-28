# Usa una imagen base de Node.js
FROM node:20.14-buster-slim

# Instala las dependencias necesarias para Puppeteer
RUN apt-get update && apt-get install -y \
  wget \
  gnupg \
  ca-certificates \
  fonts-liberation \
  libappindicator3-1 \
  libasound2 \
  libatk1.0-0 \
  libcups2 \
  libdbus-1-3 \
  libnss3 \
  libxss1 \
  lsb-release \
  xdg-utils \
  libxshmfence1 \
  libgbm-dev \
  libxkbcommon-x11-0 \
  libgtk-3-0 \
  --no-install-recommends && \
  rm -rf /var/lib/apt/lists/*

# Añade la fuente de Chromium y su clave
RUN wget -qO - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
  && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list'

# Instala Chromium
RUN apt-get update && apt-get install -y google-chrome-stable --no-install-recommends && \
  rm -rf /var/lib/apt/lists/*

# Configura la variable de entorno para Puppeteer
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable
ENV PORT=8000
ENV DB_USERNAME="root"
# **Don't store password directly in Dockerfile**
ENV DB_PASSWORD=""
ENV DB_DATABASE="sergiomedina"
ENV DB_HOST="localhost"
ENV DB_DIALECT="mysql"

# Crea el directorio de la aplicación
WORKDIR /usr/src/app

# Copia el package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install

# Copia el resto de la aplicación, incluyendo status.json
COPY . .

# Asegura que el archivo status.json tenga los permisos adecuados
RUN chmod 666 status.json

# Comando para iniciar la aplicación
CMD ["npm", "start"]
