const passwordSchema = require('../models/password');


// vérifie que le mot de passe est valide
module.exports = (req, res, next) => {
    if (!passwordSchema.validate(req.body.password)) {
        res.writeHead(400, '{"message":"Mot de passe requis : 8 caractères minimun avec 1 Majuscule et 1 minuscule."}', {
            'content-type': 'application/json'
        });
        res.end('Format de mot de passe incorrect');
    } else {
        next();
    }
};