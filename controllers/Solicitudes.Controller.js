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
    user: "jesusbag123@gmail.com",
    pass: 'asuj xqae uqjd korl'
  }
})



SolicitudesController.getSolicitudes = async (req, res) => {
  try {
    const solicitudes = await Solicitudes.findAll({
    });
    res.json(solicitudes);
  } catch (error) {
    res.json({ message: error.message });
  }
};

SolicitudesController.createSolicitud = async (req, res) => {
  try {
    // Guardar la solicitud en la base de datos
    const solicitud = await Solicitudes.create({
      estudiante: req.body.estudiante,
      curso: req.body.curso,
      seccion: req.body.seccion,
      turno: req.body.turno,
      periodo: req.body.periodo,
      fecha: Date.now(),
      tipo: req.body.tipo,
      representante: req.body.representante,
      nacido: req.body.nacido,
      edad: req.body.edad,
      cedula: req.body.cedula,
      correo: req.body.correo,
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
    if (solicitud.tipo === "constancia de estudio") {
      templatePath = path.join(__dirname, '../Templates/ConstanciaEstudios.hbs');
    } else if (solicitud.tipo === "acta de compromiso") {
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
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
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
      from: 'jesusbag123@gmail.com', // Reemplaza con tu correo de Gmail
      to: solicitud.correo,
      subject: `Solicitud de ${solicitud.tipo} procesada`,
      html: '<img src="https://bashify.io/img/28f064ff8b192ed5a9cfa26292589b06"/>', // Usar "cid" para referenciar la imagen embebida
      attachments: [
        {
          filename: 'solicitud.pdf',
          content: pdfBuffer,
        },
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
      res.json({ message: "Correo electrónico enviado con éxito" });
    });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: error.message });
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