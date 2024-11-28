const { Solicitudes } = require("../Database/db");
const fs = require('fs')
const hbs = require('handlebars')
const path = require('path');
const puppeteer = require("puppeteer")
const SolicitudesController = {};
const nodemailer = require('nodemailer');



const email = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth:{
    user: "gruposergiomedina@gmail.com",
    pass: 'vcor lohm qbka pydp'
  }
})



SolicitudesController.getSolicitudes = async (req, res) => {
  try {
    const solicitudes = await Solicitudes.findAll({
    });
    return solicitudes
  } catch (error) {
    throw new Error(error)
  }
};

SolicitudesController.createSolicitud = async (solicitudData) => {
  try {
    // Guardar la solicitud en la base de datos
    const solicitud = await Solicitudes.create({
      estudiante: solicitudData.estudiante,
      curso: solicitudData.curso,
      seccion: solicitudData.seccion,
      turno: solicitudData.turno,
      periodo: solicitudData.periodo,
      fecha: solicitudData.fecha,
      tipo: solicitudData.tipo,
      representante: solicitudData.representante,
      nacido: solicitudData.nacido,
      edad: solicitudData.edad,
      cedula: solicitudData.cedula,
      correo: solicitudData.correo,
      proceso: false
    });

    // Descomponer la fecha en componentes
    const fecha = new Date(solicitud.fecha);
    const data = {
      ...solicitud.toJSON(),
      dia: fecha.getDate(),
      mes: fecha.toLocaleString('default', { month: 'long' }), // mes en texto largo
      ano: fecha.getFullYear()
    };

    // Cargar la plantilla HTML

    let templatePath = ""
    if(solicitud.tipo === "constancia de estudio"){
      templatePath = path.join(__dirname, '../Templates/ConstanciaEstudios.hbs');
        } else if(solicitud.tipo === "acta de compromiso") {
          templatePath = path.join(__dirname, '../Templates/ActaCompromiso.hbs');      
    } else {
      templatePath = path.join(__dirname, '../Templates/CulminacionEstudios.hbs');
    }
    const templateContent = fs.readFileSync(templatePath, 'utf8');
      const template = hbs.compile(templateContent);
      console.log("Plantilla cargada con los datos");
  

    // Renderizar la plantilla con los datos de la solicitud
    const html = template({ data });
    console.log("Plantilla Renderizada con los datos");

    // Configurar Puppeteer para generar el PDF
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--single-process', // <- this one doesn't works in Windows
        '--disable-gpu'
      ],
      executablePath: '/usr/bin/google-chrome-stable',
      userDataDir: path.join(__dirname, '../puppeteer_cache') // Ruta de caché configurada
    });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });

    // Generar el PDF
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true
    });

    await browser.close();
    console.log("PDF Generado");



    // Configuración del correo electrónico
    const mailOptions = {
      from: 'gruposergiomedina@gmail.com', // Reemplaza con tu correo de Gmail
      to: solicitud.correo,
      subject: `Solicitud de ${solicitud.tipo} procesada`,
      html: '<a href="https://ibb.co/pWPxyB3"><img src="https://i.ibb.co/hXMyfJK/Carta-Sergio-Medina-page-0001.jpg" alt="Carta-Sergio-Medina-page-0001" border="0"></a>', // Usar "cid" para referenciar la imagen embebida
      attachments: [
        {
          filename: 'solicitud.pdf',
          content: pdfBuffer,
        }
      ],
    };

    // Enviar el correo electrónico
    email.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        res.status(500).json({ message: "Error al enviar el correo electrónico" });
        return;
      }
      console.log("Correo electrónico enviado:", info.response);
      return solicitud
    });
  } catch (error) {
    throw new Error("Error al crear solicitud", error)
  }
};

SolicitudesController.getSolicitudById = async (req, res) => {
  try {
    const solicitud = await Solicitudes.findAll({
      where: { id: req.params.id },
    });
    res.json(solicitud);
  } catch (error) {
    res.json({ message: error.message });
  }
};

SolicitudesController.deleteSolicitud = async (req, res) => {
  try {
    await Solicitudes.destroy({
      where: { id: req.params.id },
    });
    res.json("Se ha eliminado el registro");
  } catch (error) {
    res.json({ message: error.message });
  }
};

SolicitudesController.updateSolicitud = async (req, res) => {
  try {
    await Solicitudes.update(req.body, { where: { id: req.params.id } });
    res.json("Registro modificado exitosamente");
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports = SolicitudesController;


//asuj xqae uqjd korl CONTRASE;A NODEMAILER GMAIL