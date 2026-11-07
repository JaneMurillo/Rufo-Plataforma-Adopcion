const Router = require('express');
const mailer = require('nodemailer');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;
//const mail = require('./../modules/mail');

const router = Router();

//funcion para crear cuerpo de diferentes tipos de correos
const getEmailData = (to, template) => {
  let data = null;
  console.log('crear correo con datos del template ' + template);
  console.log('enviar correo a: ' + to);

  switch (template) {
    case 'hello':
      data = {
        from: `RUFO <${process.env.EMAIL_USER}>`,
        to,
        subject: `Hello`,
        text: 'HELLO',
      };
      console.log('template tipo hello');
      break;
    default:
      data;
  }

  return data;
};

/*const oauth2Client = new OAuth2(
  process.env.GOOGLE_API_ID,
  process.env.GOOGLE_API_SECRET,
  'http://localhost:5001/email/handleGoogleRedirect'
);

let accessToken, refreshToken;

router.get('/handleGoogleRedirect', async (req, res) => {
  console.log('handle redicted function');
  // get code from url
  const code = req.query.code;
  console.log('server 36 | code', code);
  // get access token
  oauth2Client.getToken(code, (err, tokens) => {
    if (err) {
      console.log('server 39 | error', err);
      throw new Error('Issue with Login', err.message);
    }
    accessToken = tokens.access_token;
    refreshToken = tokens.refresh_token;

    console.log('refresh and access token generated');

    res.redirect(`http://localhost:3000/contrasena`);
  });
});*/

//crear cliente oauth para actualizar token automaticamente
const createTransporter = async () => {
  console.log('funcion crear transporter');

  const oauth2Client = new OAuth2(
    process.env.GOOGLE_API_ID,
    process.env.GOOGLE_API_SECRET,
    'https://developers.google.com/oauthplayground'
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
  });

  const accessToken = await new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err) {
        console.log('access token error: ' + err);
        reject();
      }
      resolve(token);
    });
  });

  const emailTransport = mailer.createTransport({
    service: 'gmail',
    secure: true,
    auth: {
      type: 'oauth2',
      user: process.env.EMAIL_USER,
      pass: 'punlilrdoqfcrume',
      accessToken,
      clientId: process.env.GOOGLE_API_ID,
      clientSecret: process.env.GOOGLE_API_SECRET,
      refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
    },
  });

  return emailTransport;
};

//ruta para enviar correo
router.post('/enviar', async (req, res, next) => {
  console.log('path enviar correo');

  let emailTransport = await createTransporter();

  console.log('user y pass aceptados');

  emailTransport.verify((err, success) => {
    err
      ? console.log(err)
      : console.log(`=== Server is ready to take messages: ${success} ===`);
  });

  const mail = getEmailData(req.body.email, req.body.type);
  console.log('datos tomados, proceder a enviar correo');

  emailTransport.sendMail(mail, function (error) {
    console.log('callback a enviar correo');
    if (error) console.log(error);
    else console.log('email enviado');
    emailTransport.close();
  });

  //mail.sendEmail(req.body.email, req.body.type);
  next();
});

module.exports = { router };
