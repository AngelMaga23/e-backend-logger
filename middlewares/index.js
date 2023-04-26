const validarJWT   = require('./validar-jwt');
const validarAplication   = require('./validar-aplication');


module.exports = {
    ...validarJWT,
    ...validarAplication
}