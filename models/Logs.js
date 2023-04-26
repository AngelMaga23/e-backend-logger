const { Schema, model } = require('mongoose');

const LogSchema = new Schema({
    application_id: Schema.Types.ObjectId,
    type: {
        type: Schema.Types.String,
        enum: ['error', 'info', 'warning']
    },
    priority: {
        type: Schema.Types.String,
        enum: ['lowest', 'low', 'medium', 'high', 'highest']
    },
    path: {
        type: Schema.Types.String
    },
    message: {
        type: Schema.Types.String
    },
    request: new Schema({
        data: {
          type: Schema.Types.Mixed
        }
    }),
    response: new Schema({
        data: {
          type: Schema.Types.Mixed
        }
    })
},{
    timestamps: true,
    versionKey: false
});

module.exports =  model('Log', LogSchema);