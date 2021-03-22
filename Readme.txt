#So Pekocko

Ce repository est livré nu.

Pour faire fonctionner l'ensemble sur votre ordinateur, vous devrez installer node sous windows puis :

Dans le dossier backend : faire npm init

dans l'invité de commande, allez dans le dossier backend et faire

npm install -g @angular/cli 
npm install -g nodemon 
npm install --save express
npm install -g mongoose
npm install dotenv
npm install mongoose-type-email
 
Veuillez installer également 
Mongoose unique validator 
jsonwebtoken 
multer 
Helmet

dans ce même dossier Backend

Pour faire fonctionner le projet, vous devrez installer node-sass à part :
npm install node-sass@4.14.1
(attention, ne fonctionne pas avec la version 5)

## Démarrage du server

Invité de commande, dossier backend : nodemon server
Invité de commande, dossier frontend : ng server

puis dans votre navigateur, lancer `http://localhost:4200/`

