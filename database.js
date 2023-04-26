const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_CONNECT)
    .then( db => console.log('Db is connected'))
    .catch( error => console.log(error))
