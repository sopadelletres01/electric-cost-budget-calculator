const { Schema, model } = require('mongoose');
//tabal de consumos de un electrodoméstico

const powerSchema = new Schema(
  {
    typeId: {
      type: Schema.ObjectId,
      ref: 'Type',
      required: true,
    },
    options: [Number]
  },
  {
    timestamps: true,
  }
);

const Power = model('Power', powerSchema);
module.exports = Power;
