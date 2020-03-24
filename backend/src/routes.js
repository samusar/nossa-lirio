const express = require('express');

// Controllers
const MinistrieController = require('./controllers/MinistrieController');
const EventController = require('./controllers/EventController');
const ProfileMinistrieController = require('./controllers/ProfileMinistrieController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

// Rotas para tabela Minstérios
routes.get('/ministries', MinistrieController.index);

routes.post('/ministrie', MinistrieController.create);

// Rota para tabela de Eventos
routes.get('/event', EventController.index);
routes.post('/event', EventController.create);
routes.delete('/event/:id', EventController.delete);

// Rota para Perfis dos Ministérios
routes.get('/profile/ministrie', ProfileMinistrieController.index);

// Rotas de Sessão
routes.post('/sessions', SessionController.create);

module.exports = routes;