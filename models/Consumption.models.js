const { Schema, model } = require('mongoose');
//tabal de consumos de un electrodoméstico

const consumptionSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        value: {

            type:[Number]
        }
    }, {
    timestamps: true
    }
);

const Consumption = model('Consumption', consumptionSchema);
module.exports =Consumption;