// Contient les fonctions qui s'appliquent aux différentes routes pour les utilisateurs

const express = require('express'); // plugin express
const bodyParser = require('body-parser'); // Plugin Body Parser
const router = express.Router(); // router fourni par express
const userCtrl = require('../controllers/user'); // gestion de l'utilisateur
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;