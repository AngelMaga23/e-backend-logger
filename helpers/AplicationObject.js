const Joi = require('joi');

const ValidarAplication = Joi.object({
    name: Joi.string().required()
});
  
module.exports = ValidarAplication;