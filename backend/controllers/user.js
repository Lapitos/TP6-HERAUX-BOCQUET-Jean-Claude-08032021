// On fait appel à des plugins
// On utilise l'algorithme bcrypt pour hasher le mot de passe
const bcrypt = require('bcrypt');
// on utilise le package jsonwebtoken pour attribuer un token à un utilisateur
const jwt = require('jsonwebtoken');
// on récupère le modèle User
const User = require('../models/user');

// création d'un compte utilisateur

exports.signup = (req, res, next) => {
// on appelle la méthode hash avec le mot de passe de l'utilisateur et on fait 10 tours à l'algorithme
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
// Création d'un nouvel utilisateur - on passe l'email ou on récupère le mot de passe hashé par bcrypt
        const user = new User({
            email: req.body.email,
            password: hash
        });
// on sauvegarde l'utilisateur
        user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé!' }))
        .catch(error => res.status(400).json({ error }))
    })
    .catch(error => res.status(500).json({ error }));
};

// connexion au compte utilisateur

exports.login = (req, res, next) => {
// on doit trouver un utilisateur dans la BD avec la saisie faite par l'utilisateur
    User.findOne({ email: req.body.email })
    .then(user => {
        if (!user) {
// si pas trouvé on retourne un 401 - non autorisé
            return res.status(401).json({ error: 'Utilisateur non trouvé !'});
        }
// sinon, on compare le mot de passe avec le hash en DB
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
// sinon, c'est bon mais le mot de passe est incorrect
            if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !'});  
            }
// si c'est vrai, on renvoie un status 200 avec l'objet json avec l'userID et le token
// on s'assure ainsi que l'utilisateur ne pourra pas modifier les sauces créées par d'autres utilisateurs
            res.status(200).json({
                userId: user._id,
                token: jwt.sign(
                    { userId: user._id },
// clef de codage -- dans la vraie vie, on utilisera quelque chose de plus fort. Validité portée à 24h
                    'RANDOM_TOKEN_SECRET',
                    { expiresIn: '24h' }
                )
            });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};