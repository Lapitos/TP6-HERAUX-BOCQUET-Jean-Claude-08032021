// récupération du package jsonwebtoken
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
// on vérifie que le token correspond à l'ID de l'utilisateur dans la requête.
// on récupère le token dans le header le 2ème élément car le premier c'est bearer
        const token = req.headers.authorization.split(' ') [1];
// on décode et on vérifie qu'ils correspondent
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
// le token ne correspond pas
            throw Error;
        } else {
            next();
        }
// on attrape l'erreur en cas de problème d'authentification
    } catch (error) {
        res.status(401).json({ error: error });
    }
};