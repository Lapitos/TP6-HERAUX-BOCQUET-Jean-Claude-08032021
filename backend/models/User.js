// on importe Mongoose
const mongoose = require('mongoose');
// Plugin qui valide le mail de façon à ce qu'il soit unique dans la BD
// nécessite d'installer le plugin avec npm install --save mongoose-unique-validator
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
//type email requis avec vérif que l'adresse soit unique dans la DB
    email: {type: String, required: true, unique: true}, 
//type mot de passe requis
    password: {type: String, required: true}
});
// plugin pour garantir un email unique
userSchema.plugin(uniqueValidator);
// on exporte le schema avec le modèle User
module.exports = mongoose.model('User', userSchema);