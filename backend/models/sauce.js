// on importe mongoose
const mongoose = require('mongoose');
// appel au middleware pour la validation des champs de la sauce à la création
const sauceValidation = require('../middleware/sauceValidation');

// création d'un schéma de données avec les champs souhaités

const sauceSchema = mongoose.Schema({
	userId: { type: String, required: true },
	name: { type: String, required: true },
	manufacturer: { type: String, required: true },
	description: { type: String, required: true },
	mainPepper: { type: String, required: true },
	heat: { type: Number, required: true, maxlength: [10, 'Nombre limité à 10'] },
	imageUrl: { type: String, required: true },
	likes: { type: Number, required: false },
	dislikes: { type: Number, required: false },
	usersLiked: { type: [String], required: false },
	usersDisliked: { type: [String], required: false },
});

// exportation du schéma en tant que modèle Mongoose avec le nom de Sauce

module.exports = mongoose.model('Sauce', sauceSchema);