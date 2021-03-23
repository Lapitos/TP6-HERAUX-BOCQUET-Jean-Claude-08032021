// on importe mongoose
const mongoose = require('mongoose');
// appel au middleware pour la validation des champs de la sauce à la création

// création d'un schéma de données avec les champs souhaités

const sauceSchema = mongoose.Schema({
	userId: { type: String, required: true },
	name: { type: String, required: true, minlength: [5, 'Minimum 5 caractères'] },
	manufacturer: { type: String, required: true, minlength: [5, 'Minimum 5 caractères'] },
	description: { type: String, required: true, minlength: [15, 'Minimum 15 caractères'] },
	mainPepper: { type: String, required: true, minlength: [5, 'Minimum 5 caractères'] },
	heat: { type: Number, required: true, maxlength: [10, 'Nombre limité à 10'] },
	imageUrl: { type: String, required: true },
	likes: { type: Number, required: false, default: 0 },
	dislikes: { type: Number, required: false, default: 0 },
	usersLiked: { type: [String], required: false },
	usersDisliked: { type: [String], required: false },
});

// exportation du schéma en tant que modèle Mongoose avec le nom de Sauce

module.exports = mongoose.model('Sauce', sauceSchema);