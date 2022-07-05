const { Schema, model } = require('mongoose');

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
    },
    lisAppliance: [
      {
        type: Schema.ObjectId,
        ref: 'appliance',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = model('User', userSchema);

module.exports = User;
