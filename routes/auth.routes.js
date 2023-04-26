'use strict';

const router = require('express').Router();

const { validarAplication } = require("../middlewares");
const controller = require('../controllers/auth.controller');

// router.get('/', controller.all);
router.post('/',[validarAplication], controller.login);
// router.get('/:id', controller.info);
// router.put('/:id', controller.update);
// router.delete('/:id', controller.delete);

module.exports = router;