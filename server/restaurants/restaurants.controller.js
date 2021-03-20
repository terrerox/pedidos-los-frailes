const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const restaurantService = require('./restaurant.service');

// routes
router.post('/authenticate', authenticateSchema, authenticate);
router.post('/register', registerSchema, register);
router.get('/', getAll);
router.get('/current', authorize(), getCurrent);
router.get('/:id', getById);
router.get('/img/:id', getImage);
router.put('/', authorize(), updateSchema, update);
router.delete('/:id', authorize(), _delete);

module.exports = router;

function authenticateSchema(req, res, next) {
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function authenticate(req, res, next) {
    restaurantService.authenticate(req.body)
        .then(restaurant => res.json(restaurant))
        .catch(next);
}

function registerSchema(req, res, next) {
    const schema = Joi.object({
        title: Joi.string().required(),
        category: Joi.string().required(),
        phoneNumber: Joi.string().required(),
        address: Joi.string().required(),
        description: Joi.string().required(),
        image: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().min(6).required()
    });
    validateRequest(req, next, schema);
}

function register(req, res, next) {
    req.body.imageUrl = `${req.protocol}://${req.headers.host}/restaurants/img/`
    restaurantService.create(req.body)
        .then(() => res.json({ message: 'Registrado con éxito' }))
        .catch(next);
}

function getAll(req, res, next) {
    restaurantService.getAll()
        .then(restaurants => res.json(restaurants))
        .catch(next);
}

function getCurrent(req, res, next) {
    res.json(req.restaurant);
}

function getById(req, res, next) {
    restaurantService.getById(req.params.id)
        .then(restaurant => res.json(restaurant))
        .catch(next);
}

function getImage(req, res, next) {
    const id = req.params.id;
    restaurantService.getImage(id)
        .then(image => res.end(image))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        title: Joi.string().empty(''),
        category: Joi.string().empty(''),
        address: Joi.string().empty(''),
        phoneNumber: Joi.string().empty(''),
        rating: Joi.string().empty(''),
        description: Joi.string().empty(''),
        image: Joi.string().empty(''),
        email: Joi.string().empty(''),
        password: Joi.string().min(6).empty('')
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    restaurantService.update(req.restaurant.id, req.body)
        .then(restaurant => res.json(restaurant))
        .catch(next);
}

function _delete(req, res, next) {
    restaurantService.delete(req.params.id)
        .then(() => res.json({ message: 'Restaurante eliminado con éxito' }))
        .catch(next);
}