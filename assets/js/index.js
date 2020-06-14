const express = require("express");
const formidableMiddleware = require("express-formidable");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(formidableMiddleware());
app.use(cors());



var API_KEY = 'YOUR_API_KEY';
var DOMAIN = 'YOUR_DOMAIN_NAME';
var mailgun = require('mailgun-js')({
  apiKey: API_KEY,
  domain: DOMAIN
});

const data = {
  from: 'Excited User <me@samples.mailgun.org>',
  to: 'foo@example.com, bar@example.com',
  subject: 'Hello',
  text: 'Testing some Mailgun awesomeness!'
};

mailgun.messages().send(data, (error, body) => {
  console.log(body);
});
// Données fournies par mailgun (à mettre dans un fichier .env avant déploiement sur Heroku !!)
const API_KEY = process.env.MAILGUN_API_KEY;
const DOMAIN = process.env.MAILGUN_DOMAIN;
const mailgun = require("mailgun-js")({
  apiKey: API_KEY,
  domain: DOMAIN
});

app.post("/form", (req, res) => {
  console.log(req.fields);

  // Destructuring
  // On destructure l'object req.fields c'est-à-dire qu'on extrait les données de l'objet grâce à la syntaxe suivante :
  const {
    firstname,
    lastname,
    email,
    subject,
    message
  } = req.fields;

  // Objet data qui contient les informations relatives au mail que l'on recevra
  const data = {
    from: `${lastname} ${firstname} <${email}>`,
    to: "mon-mail@gmail.com",
    subject: subject,
    text: message,
  };

  // Envoi d'un mail par mailgun vers notre adresse mail perso
  mailgun.messages().send(data, (error, body) => {
    console.log(error); // en cas de succès, undefined
    console.log(body);

    // Réponses de la route en tout cas d'erreur ou s'il n'y a pas d'erreur
    if (error) {
      res.status(400).json({
        error: "Le mail n'a pas pu être envoyé"
      });
    } else {
      res.json({
        message: "Le mail a bien été envoyé"
      });
    }
  });
});

app.get("/", (req, res) => {
  res.send("Bienvenue sur mon serveur dédié au formulaire");
});

app.all("*", (req, res) => {
  res.json({
    message: "All routes"
  });
});

app.listen(process.env.PORT, () => {
  console.log("Server started");
});