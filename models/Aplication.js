const { Schema, model } = require('mongoose');

const AplicationSchema = new Schema({
    name: Schema.Types.String
},{
    timestamps: true,
    versionKey: false
});
module.exports =  model('Aplication', AplicationSchema);