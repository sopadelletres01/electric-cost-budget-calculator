const { Schema, model } = require('mongoose');
const typesSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    consum: {
      type: [Number],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Type = model('Type', typesSchema);
module.exports = Type;
