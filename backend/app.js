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
const helmet = require('helmet');
//const nocache = require('nocache');


// partie connexion à la base de données MongoDB avec gestion des erreurs
mongoose.connect('mongodb+srv://Jean-Claude:cCAzIRCKMRZPYbxr@cluster0.2j6mr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
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

// Rendre la requete exploitable grâce à Body Parser
// body-parser transforme le corps de la requête qui est en JSON en objet JS utilisable
app.use(bodyParser.json());
// Gestion de la ressource image
app.use('/images', express.static(path.join(__dirname, 'images')));
// Routes dédiées aux sauces
app.use('/api/sauces', stuffRoutes);
// Routes dédiées aux utilisateurs
app.use('/api/auth', userRoutes);
// Exportation de l'application express
module.exports = app;