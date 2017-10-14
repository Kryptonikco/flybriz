require('dotenv').config();
const nodemailer = require('nodemailer');
const nodemailSmtpTransport = require('nodemailer-smtp-transport');

const host = process.env.EMAIL_HOST;
const port = process.env.EMAIL_PORT;
const user = process.env.EMAIL_USERNAME;
const pass = process.env.EMAIL_PASSWORD;

const transporterOpts = {
  host,
  port,
  secureConnection: false, 
  auth: {
      user, 
      pass,  
  }
};

const transporter = nodemailer
  .createTransport(nodemailSmtpTransport(transporterOpts));

module.exports = ({
  msg,
  to,
  cities,
}) => {
  console.log('Mailer');
  transporter.sendMail({
    from: user,
    to,
    text: msg,
    subject: `[FEBA]: Votre voyage ${cities[0]}-${cities[1]}` 
  });
};



