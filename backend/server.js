// Ecoute des requêtes http et réponse

const http = require('http'); // Import package http
const app = require('./app'); // Import app

// NormalizePort renvoie un port valide et configure le port de connexion
const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

// Ajout du port de connection si déclaration sinon c'est 3000
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

// Gestion des erreurs
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

// Création d'un serveur avec express
// Constante pour les appels serveur
const server = http.createServer(app);

// Gestion des évènements pour le retour sur console
server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

// On écoute le port 
server.listen(port);

