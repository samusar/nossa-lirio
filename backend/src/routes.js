const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

// Controllers
const MinistrieController = require('./controllers/MinistrieController');
const EventController = require('./controllers/EventController');
const ProfileMinistrieController = require('./controllers/ProfileMinistrieController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

// Rotas para tabela Minstérios
routes.get('/ministries', MinistrieController.index);
routes.post('/ministrie',celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        leader: Joi.string().required(),
        logo: Joi.string().required(),
    })
}), MinistrieController.create);

// Rota para tabela de Eventos
routes.get('/event', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}), EventController.index);
routes.post('/event', EventController.create);
routes.delete('/event/:id',celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    }),
}), EventController.delete);

// Rota para Perfis dos Ministérios
routes.get('/profile/ministrie',celebrate({
    // Nos Headers nos colocamos a validação dentro de object para que ele ignore qualquer outro parâmetro que seja enviado
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}), ProfileMinistrieController.index);

// Rotas de Sessão
routes.post('/sessions', SessionController.create);

module.exports = routes;