//var http = require("http");
var https = require("https");
var express = require("express");
var Mailgun = require("mailgun-js");
var nodemailer = require("nodemailer");
var bodyparser = require("body-parser")
var nodemailerTransport = require("nodemailer-mailgun-transport");
var fs = require("fs");
// auth mailgun
const auth ={
  auth: {
      api_key: 'key-1e765119d88f011eca346365fb779e20',
      domain: 'mail.artisanpresto.net'
  }
 }

 const nodemailerMailgun = nodemailer.createTransport(nodemailerTransport(auth));
 const app = express();
 app.use(express.json());

 app.post('/inbox',express.urlencoded({ extended: true }), (req,res) => {
   console.log(req.body.email)
  nodemailerMailgun.sendMail({
    from: req.body.email,
    to: req.body.to,
    subject: req.body.subject,
  html: `<p>${req.body.message}</p>`,
    text: 'Mailgun rocks, pow pow!'
  }, function (err, info) {
  if (err) {
       console.log('Error: ' + err);
       res.status(500).send('Problème Envoi Email! + '+ err);

  }
  else {
      console.log('Response: ' + info);
      res.status(200).send("Email Envoyé avec Succes " + info)
  }
  });
  
})
//create a server object:
//app.listen(8080);

app.get('/', (req, res) => {
    res.send('Hello World');
});




https.createServer({
    key: fs.readFileSync('../key.pem'),
    cert: fs.readFileSync('../cert.pem'),
    passphrase: 'Bvp88L7SHENZHEN'
}, app)
.listen(3000);
