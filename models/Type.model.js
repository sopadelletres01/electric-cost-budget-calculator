const { Schema, model } = require('mongoose');
const typesSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    power: {
      type: [Number],
      required: true,
    },
    longDuration: {
      type:Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
const Type = model('Type', typesSchema);
module.exports = Type;
