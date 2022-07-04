const { Schema, model } = require('mongoose');
enum Consumptions{
    A,"A+++" = 0.25,
    B = 0.5,
    C = 0.75,
    D = 0.4,

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
            enum: ['A+++', 'A++', 'A+', 'A', 'B', 'C', 'D']
        }
        // en 2021 cambio a solamente A, B, C , D
        // hasta 20221 era 'A+++', 'A++', 'A+', B, 'C', 'D'
    }, {
    timestamps: true
}
);

const Appilance = model('Electric', appilanceSchema);
module.exports =Appilance;