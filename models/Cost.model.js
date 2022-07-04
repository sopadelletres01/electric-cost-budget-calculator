const { Schema, model } = require('mongoose');
//tabal de consumos de un electrodoméstico

const costSchema = new Schema(
    {
        userId: {
            type: Schema.ObjectId, ref: 'User',
            required: true,
        },
        applianceId: {
            type: Schema.ObjectId, ref: 'Appliance', 
            required: true

        },
        cost: {
            type: Number,
            required: true,
        }
    }, {
    timestamps: true
    }
);

const Cost = model('Cost', costSchema);
module.exports =Cost;