var nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'marion.gorczany90@ethereal.email',
        pass: 'gfTEAzVaZ189H3Bceq'
    }
  });

  module.exports = transporter;