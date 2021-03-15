// on importe multer permettant de gérer les fichiers par requête http
const multer = require('multer');
// on créér les MIME pour définir les formats images
const MIME_TYPES = {
   'image/jgp': 'jpg',
   'image/jpeg': 'jpg',
   'image/png': 'png' 
};
// Objet de configuration pour savoir où enregistrer les fichiers et les nommer
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
//Dossier qui se trouve dans le backend
        callback(null, 'images')
    },
//on va générer un nouveau nom avec le nom original afin d'éviter les doublons
    filename: (req, file, callback) => {
// on supprime des espaces et on les remplaces par des _
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
//on ajoute un timestamp avec un point et l'extension afin qu'il soit unique
        callback(null, name + Date.now() + '.' + extension);
    }
});
//on exporte le module, on passe l'objet storage
module.exports = multer({ storage }).single('image');