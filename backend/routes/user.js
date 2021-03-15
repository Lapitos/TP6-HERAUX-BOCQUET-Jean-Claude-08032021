const express = require('express'); // plugin express
const router = express.Router(); // router fourni par express
const userCtrl = require('../controllers/user'); // gestion de l'utilisateur
const verifyPassword = require('../middleware/verifyPassword');
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;