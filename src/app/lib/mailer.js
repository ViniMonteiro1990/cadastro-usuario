const nodemailer = require('nodemailer')


module.exports = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "57a53e20194bc3",
      pass: "0037730b74629f"
    }
  });

