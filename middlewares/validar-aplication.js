const Joi = require('joi'); 

const validarAplication = async( req = request, res = response, next ) => {

    const { body } = req;


    try {
        
		const schemaCreate = Joi.object().keys({ 
			name: Joi.string().required(),

		}); 

        const result = schemaCreate.validate(body); 

        const { value, error } = result;

        const valid = error == null;

        if(error == null){
            next();
        }else{
            res.status(401).json({
                msg: error
            })
        }

    } catch (error) {

        res.status(401).json({
            msg: 401
        })
    }

}




module.exports = {
    validarAplication
}