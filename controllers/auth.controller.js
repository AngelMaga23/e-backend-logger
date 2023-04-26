const { response } = require('express');
const { Aplication, Authorization, Logs } = require('../models');

const { generarJWT } = require('../helpers');


class AuthController {


	async login(req = request, res = response) {

		const { name } = req.body;

		const appName = await Aplication.findOne({
			name: name
		});

        if(!appName){

            var newApp = new Aplication({
				name: name
			});
			var savedApp = await newApp.save();
	
			var nLog;
	
			if (savedApp) {
				nLog = new Logs({
					application_id: savedApp,
					path: '/api/logs',
					message: 'Application saved',
					priority: 'lowest',
					highest: 'info',
					request: {
						data: req.body
					},
					response: {
						data: {
							message: 'Application saved'
						}
					}
				});
			} else {
				nLog = new Logs({
					application_id: savedApp,
					path: '/logs/logs',
					message: 'Application not saved',
					priority: 'high',
					highest: 'error',
					request: {
						data: req.body
					},
					response: {
						data: {
							message: 'Application not saved'
						}
					}
				});
			}
	
			await nLog.save();

        }

        // Generar el JWT
        const token = await generarJWT( !appName ? savedApp._id:appName.id );

        const newAuth = await new Authorization({
            token: token
        });

        const saveAuth = await newAuth.save();

        return res.status(200).json({
            saveAuth
        });

	}

}

module.exports = new AuthController();