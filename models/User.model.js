const { Schema, model } = require('mongoose');

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique:true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    lastname: {
      type: String,
      required: false,
      default:" "
    },
    name: {
      type: String,
      required: false,
      default:" "
    },
    password: {
      type: String,
      required: true,
      minLength: 8
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
