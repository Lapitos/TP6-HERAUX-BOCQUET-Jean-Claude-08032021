// Cette partie ne s'occupe que de la partie routing. La logique métier est
// gérée dans le dossier controllers

const express = require('express'); // plugin express
const router = express.Router(); // appel du router fourni par express

const stuffCtrl = require('../controllers/stuff'); // gestion des sauces
const auth = require('../middleware/auth'); // sécurisation des routes
const multer = require('../middleware/multer-config'); // gestion des images

router.post('/', auth, multer, stuffCtrl.createSauce); // pour créer les sauces
router.put('/:id', auth, multer, stuffCtrl.modifySauce); // pour modifier la sauce
router.delete('/:id', auth, stuffCtrl.deleteSauce); // pour effacer la sauce
router.get('/:id', auth, stuffCtrl.getOneSauce); // pour obtenir une sauce en particulier
router.get('/', auth, stuffCtrl.getAllSauce); // pour obtenir toutes les sauces
router.post('/:id/like', auth, stuffCtrl.likeSauce); // pour gérer les likes des sauces

module.exports = router;