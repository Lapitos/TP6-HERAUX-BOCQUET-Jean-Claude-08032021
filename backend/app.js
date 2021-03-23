// Constantes requises pour l'application
// Ajout des plugins externes nécessaire
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
// On importe la route dédiée aux sauces
const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');
// sécurité
require('dotenv').config()
const helmet = require('helmet');
const maskEmailsPhones = require('mask-email-phone');


// partie connexion à la base de données MongoDB avec gestion des erreurs
// la connection s'effectue via une variable et est stockée dans un fichier env et ceci afin de ne pas rendre le mot de passe visible
mongoose.connect(process.env.DB_ENV, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

// Création d'une application express
const app = express();
  
 // autorisation ou refus des appels HTTP
 // On contourne les erreurs et blocages afin de faire des requetes depuis son navigateur
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

// cross-scripting protection (helmet)
app.use((req, res, next) => {
  res.setHeader("X-XSS-Protection", "1; mode=block");
  next();
});

// Désactivation de l'entête X-Powered-by en cas de défaillance d'helmet
// Evite de pouvoir détecter les applications qui s'exécute sous express et de lancer des attaques spécifiques
app.disable('x-powered-by');



// Rendre la requete exploitable grâce à Body Parser
// body-parser transforme le corps de la requête en objet utilisable
app.use(bodyParser.json());
// Gestion de la ressource image
app.use('/images', express.static(path.join(__dirname, 'images')));
// Routes dédiées aux sauces
app.use('/api/sauces', stuffRoutes);
// Utilisation d'helmet
app.use(helmet());
// Routes dédiées aux utilisateurs
app.use('/api/auth', userRoutes);
// Exportation de l'application express
module.exports = app;