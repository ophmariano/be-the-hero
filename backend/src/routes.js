const express = require('express');

const ongControllers = require('./controllers/ongControllers');
const incidentController = require('./controllers/incidentController');
const profileController = require('./controllers/profileController');
const sessionController = require('./controllers/sessionController');

const routes = express.Router();

routes.post('/sessions', sessionController.create);

routes.get('/ong', ongControllers.index);
routes.post('/ong', ongControllers.create);

routes.get('/incident', incidentController.index);
routes.post('/incident', incidentController.create);
routes.delete('/incident/:id', incidentController.delete);

routes.get('/profile/ongincidents', profileController.index);

module.exports = routes;
