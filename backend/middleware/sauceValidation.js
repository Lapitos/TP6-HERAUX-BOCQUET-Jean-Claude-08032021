// Appel du plugin mongoose-validator
const validate = require('mongoose-validator'); 
// Validation du champ 
exports.nameValidator = [ 
  validate({
    validator: 'isLength',
    arguments: [3, 60], // 3 et 60 caractères
    message: 'Le nom de la sauce doit contenir entre 3 et 60 caractères',
  }),
  validate({
    validator: 'matches',
    arguments: /^[a-z\d\-_\s]+$/i, // On restreint les symboles
    message: "Seuls les chiffres et les lettres sont utilisables",
  }),
];
// Validation pour le manufacturer
exports.manufacturerValidator = [ 
  validate({
    validator: 'isLength',
    arguments: [3, 60], // 3 et 60 caratères
    message: 'Le nom du fabricant doit contenir entre 3 et 60 caractères',
  }),
  validate({
    validator: 'matches',
    arguments: /^[a-z\d\-_\s]+$/i, // On restreint les symboles
    message: "Seuls les chiffres et les lettres sont utilisables",
  }),
];
// Validation pour la description de la sauce
exports.descriptionValidator = [ 
  validate({
    validator: 'isLength',
    arguments: [10, 150], // 10 et 150 caractères
    message: 'La description de la sauce doit contenir entre 10 et 150 caractères',
  }),
  validate({
    validator: 'matches',
    arguments: /^[a-z\d\-_\s]+$/i, // On restreint les symboles
    message: "Seuls les chiffres et les lettres sont utilisables",
  }),
];
// Validation pour le principal ingrédient de la sauce
exports.pepperValidator = [ 
  validate({
    validator: 'isLength',
    arguments: [3, 20], // 3 et 20 caractères
    message: 'Le principal ingrédient doit contenir entre 3 et 20 caractères',
  }),
  validate({
    validator: 'isAlphanumeric', //Que des caractères alphanumériques
    message: "Seules les lettres sont utilisables",
  }),
];