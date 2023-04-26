const generarJWT   = require('./generarJWT');
const AplicationObject   = require('./AplicationObject');


module.exports = {
    ...generarJWT,
    ...AplicationObject
}