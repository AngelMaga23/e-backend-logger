const { Schema, model, Types } = require('mongoose');

const AuthorizationSchema = new Schema({
    application_id: Schema.Types.ObjectId,
    token: {
        type: Schema.Types.String
    },
},{
    timestamps: true,
    versionKey: false
});

module.exports =  model('Authorization', AuthorizationSchema);