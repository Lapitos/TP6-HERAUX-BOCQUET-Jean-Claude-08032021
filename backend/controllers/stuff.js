// Récupération du modèle 'sauce'
const Sauce = require('../models/sauce');
// Récupération du module 'file system' de Node gérant les téléchargements et modifications d'images
const fs = require('fs');

// Création d'une sauce : 
exports.createSauce = (req, res, next) => {
	// On transforme les données en objet js
    const sauceObject = JSON.parse(req.body.sauce);
	// On supprime l'id généré automatiquement car l'id de la sauce est créé par la base MongoDB
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
	// On modifie l'URL de l'image car on veut une URL complète
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
	likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: []
    });
	// Sauvegarde de la sauce et gestion des erreurs
    sauce.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
        .catch(error => res.status(400).json({ error }));
};

// Modification d'une sauce 
exports.modifySauce = (req, res, next) => {
	// Partie permettant de supprimer l'image en cas de modification
  let sauceObject = {};
  req.file ? (
    Sauce.findOne({
      _id: req.params.id
    }).then((sauce) => {
      // On supprime l'ancienne image du serveur
     const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlinkSync('images/${filename}', function(err) {
        if (err) throw err;
      
        console.log('fichier effacé');
      });
    }),
	// On modifie les données et on ajoute la nouvelle image
    sauceObject = {...JSON.parse(req.body.sauce), 
      imageUrl: `${req.protocol}://${req.get('host')}/images/${
        req.file.filename
      }`,
    }
  ) : (sauceObject = {...req.body})
  Sauce.updateOne({ _id: req.params.id}, {...sauceObject,_id: req.params.id})
    .then(() => res.status(200).json({
      message: 'Sauce modifiée !'
    }))
    .catch((error) => res.status(400).json({
      error
    }))
}

// Suppression d'une sauce 
exports.deleteSauce = (req, res, next) => {
	// avant tout, on recherche l'image et on l'efface
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`/images/${filename}`, () => {
	// on supprime les données dans la BD
            Sauce.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
         .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
};


// Obtenir une sauce en particulier avec son ID dans la DB
exports.getOneSauce = (req, res, next) => {
// On utilise findOne et on compare, l'id de la sauce doit être le même que dans la requête et on gère les erreurs
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
};

// Obtenir la liste des sauces
exports.getAllSauce = (req, res, next) => {
// On utilise find pour obtenir la liste complète de la Db
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
};

//Bouton like une sauce
exports.likeSauce = (req, res, next) => {
// Switch évalue une expression et va exécuter les instructions correspondantes
    switch (req.body.like) {
// premier cas, on retire une unité a un like ou a un dislike
        case 0:
            Sauce.findOne({ _id: req.params.id })
                .then((sauce) => {
                    if (sauce.usersLiked.find(user => user === req.body.userId)) {
                        Sauce.updateOne({ _id: req.params.id }, {
                            $inc: { likes: -1 },
                            $pull: { usersLiked: req.body.userId },
                            _id: req.params.id
                        })
                            .then(() => { res.status(200).json({ message: 'Ton avis a été pris en compte!' }); })
                            .catch((error) => { res.status(400).json({ error: error }); });

                    } if (sauce.usersDisliked.find(user => user === req.body.userId)) {
                        Sauce.updateOne({ _id: req.params.id }, {
                            $inc: { dislikes: -1 },
                            $pull: { usersDisliked: req.body.userId },
                            _id: req.params.id
                        })
                            .then(() => { res.status(200).json({ message: 'Ton avis a été pris en compte!' }); })
                            .catch((error) => { res.status(400).json({ error: error }); });
                    }
                })
                .catch((error) => { res.status(404).json({ error: error }); });
            break;
// deuxième cas, on ajoute une unité a un like ou a un dislike
        case 1:
            Sauce.updateOne({ _id: req.params.id }, {
                $inc: { likes: 1 },
                $push: { usersLiked: req.body.userId },
                _id: req.params.id
            })
                .then(() => { res.status(200).json({ message: 'Ton avis a été pris en compte!' }); })
                .catch((error) => { res.status(400).json({ error: error }); });
            break;

        case -1:
            Sauce.updateOne({ _id: req.params.id }, {
                $inc: { dislikes: 1 },
                $push: { usersDisliked: req.body.userId },
                _id: req.params.id
            })
                .then(() => { res.status(200).json({ message: 'Ton avis a été pris en compte!' }); })
                .catch((error) => { res.status(400).json({ error: error }); });
            break;
        default:
            console.error('mauvaise requête');
    }
}
