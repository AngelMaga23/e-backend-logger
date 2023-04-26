const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const { Aplication } = require('../models');


const validarJWT = async( req = request, res = response, next ) => {

    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try {
        
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );
    
        // leer el app que corresponde al uid
        const appFound = await Aplication.findById(uid);


        if( !appFound ) {
            return res.status(401).json({
                msg: 'Token no válido - AppName no existe DB'
            })
        }

        req.appFound = appFound;
        next();

    } catch (error) {

        res.status(401).json({
            msg: 401
        })
    }

}




module.exports = {
    validarJWT
}