const { Schema, model } = require('mongoose');
//tabal de consumos de un electrodoméstico
enum Consumptions{
    A = -0.55,
    B = - 0.45,
    C = -0.30,
    D = -0.5,
    E = 0.5,
    F = 0.10,
    G = 0.20
}

const appilanceSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        prices: {
            type: [Number],
            required: true,
        },
        consum: {
            enum: [Consumptions]
        },
        type: {
            type: Schema.Types.ObjectId, ref: 'Types'
        }
        // en 2021 cambio a solamente A, B, C , D
        // hasta 20221 era 'A+++', 'A++', 'A+', B, 'C', 'D'
    }, {
    timestamps: true
}
);

const Appilance = model('Electric', appilanceSchema);
module.exports =Appilance;