const { Schema, model } = require('mongoose');
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
            enum: ['']
        }
    }, {
    timestamps: true
}
);

const Appilance = model('Electric', appilanceSchema);
module.exports =Appilance;