const { Schema, model } = require('mongoose');

const typesSchema = new Schema(

    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        values: {
            type: Number,
            required: true,
        }
    }
)
const Types = model('Type', typesSchema);
module.exports = Types;