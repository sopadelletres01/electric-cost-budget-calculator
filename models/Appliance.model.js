const { Schema, model } = require('mongoose');
//tabal de consumos de un electrodoméstico

const applianceSchema = new Schema(
  {
    type: {
      type: Schema.ObjectId,
      ref: 'Type',
      required: true,
    },
    consum: {
      type: Schema.ObjectId,
      ref: 'Consumption',
      required: true,
    },
    userId: {
      type: Schema.ObjectId,
      ref: 'User',
    },
    longDuration: {
      type: Boolean,
      required: true,
    },
    totalCost: {
      type: Number,
      required: false,
    },
    power: {
      type:Schema.ObjectId,
      ref:'Type'
    }
  },
  {
    timestamps: true,
  }
);

const Appliance = model('Appliance', applianceSchema);
module.exports = Appliance;
