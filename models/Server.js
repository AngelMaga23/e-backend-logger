const express = require('express');
// const cors = require('cors');
const morgan = require('morgan');
require('../database');

class Server{
    constructor(){
        this.app  = express();
        this.port = process.env.PORT;

        this.paths = {
            //Rutas para Logs
            logs:                   '/api/logs',
            // Ruta para auth
            auth:                   '/api/auth',

        }

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    middlewares(){


        this.app.use(morgan("dev"));
        
        this.app.use(express.urlencoded({ extended: false }));
        // Lectura y parseo del body
        this.app.use( express.json() );


    }

    routes(){
        //Rutas para Settings
        this.app.use( this.paths.logs, require('../routes/main.routes'));
        this.app.use( this.paths.auth, require('../routes/auth.routes'));

    }

    listen(){
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }
}


module.exports = Server;