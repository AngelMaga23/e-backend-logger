'use strict';

const router = require('express').Router();

const { validarJWT, validarAplication } = require("../middlewares");

const controller = require('../controllers/main.controller');

router.get('/',[validarJWT], controller.all);
router.post('/',[validarJWT,validarAplication], controller.create);
router.get('/:id',[validarJWT], controller.info);
router.put('/:id',[validarJWT, validarAplication], controller.update);
router.delete('/:id',[validarJWT], controller.delete);

module.exports = router;