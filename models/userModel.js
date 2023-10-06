const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    sex: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: 'Employee',
      enum: ['Employee', 'Admin'],
    },
    password: {
      type: String,
      required: true,
    },
    reviewsToBeGiven: {
      type: [String],
    },
    reviewsGotten: {
      type: [Number],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
