'use strinct';
const { response, request } = require('express');
const {
	Aplication,
	Logs
} = require('../models');


class MainController {

	async all(req = request, res = response) {

		try {
			const applications = await Aplication.find();
			return res.status(200).json(applications);
		} catch (error) {
			return res.status(500).json({ message: error });
		}

	}

	async create(req = request, res = response) {

		try {
			
			const { name } = req.body;
	
			const newApp = new Aplication({
				name: name
			});
			const savedApp = await newApp.save();
	
			let nLog;
	
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

			return res.status(200).json(savedApp);

		} catch (error) {
			return res.status(500).json({ message:error });
		}


	}

	async info(req = request, res = response) {

		const { id } = req.params;

		const logInfo = await Logs.findOne({
			application_id: id
		});

		if(!logInfo){
			return res.status(400).json({ message:"Log Not Found" });
		}else{
			return res.status(200).json(logInfo);
		}

	}

	async update(req = request, res = response) {

		try {
			const { id } = req.params;
			const { name } = req.body;
	
			const updatedApp = await Aplication.findByIdAndUpdate(id, { name }, { new: true });
			
			let nLog;
	
			if (updatedApp) {
				nLog = new Logs({
					application_id: updatedApp,
					path: '/api/logs',
					message: 'Application updated',
					priority: 'lowest',
					highest: 'info',
					request: {
						data: req.body
					},
					response: {
						data: {
							message: 'Application updated'
						}
					}
				});
			} else {
				nLog = new Logs({
					application_id: updatedApp,
					path: '/logs/logs',
					message: 'Application not updated',
					priority: 'high',
					highest: 'error',
					request: {
						data: req.body
					},
					response: {
						data: {
							message: 'Application not updated'
						}
					}
				});
			}

			await nLog.save();
			return res.status(200).json(updatedApp);

		} catch (error) {
			return res.status(500).json({ message:error });
		}


	}

	async delete(req = request, res = response) {

		try {
			const { id } = req.params;
	
			const removedApp = await Aplication.findByIdAndRemove(id, { new: true });
			
			let nLog;
	
			if (removedApp) {
				nLog = new Logs({
					application_id: removedApp,
					path: '/api/logs',
					message: 'Application removed',
					priority: 'lowest',
					highest: 'info',
					request: {
						data: req.body
					},
					response: {
						data: {
							message: 'Application removed'
						}
					}
				});
			} else {
				nLog = new Logs({
					application_id: removedApp,
					path: '/logs/logs',
					message: 'Application not removed',
					priority: 'high',
					highest: 'error',
					request: {
						data: req.body
					},
					response: {
						data: {
							message: 'Application not removed'
						}
					}
				});
			}

			await nLog.save();
			return res.status(200).json(removedApp);

		} catch (error) {
			return res.status(500).json({ message:error });
		}

	}
}

module.exports = new MainController();