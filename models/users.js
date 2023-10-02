const { symptomSchema } = require('./symptoms');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullName: {
    type: String,
    required: [true]
  },
  email: {
    type: String,
    required: [true]
  },
  pin: {
    type: String,
    required: [true]
  },
  sex: {
    type: String,
    required: [false],
    validate: {
      validator: function(value) {
        return ['Male', 'Female'].includes(value);
      },
      message: 'The field "sex" has to be "Male" or "Female".'
    },
  },
  role: {
    type: String,
    required: [true],
    validate: {
      validator: function(value) {
        return ['Patient', 'Doctor'].includes(value);
      },
      message: 'The field "role" has to be "Patient" or "Doctor".'
    },
  },
  symptoms: [
    symptomSchema
  ],
  pet: {
    type: String,
    required: [true],
    default: 'assets/pets/pet1.png'
  },
  doctor: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  }],
  license: {
    type: String,
    required: [false]
  },
  profession: {
    type: String,
    required: [false]
  },
  description: {
    type: String,
    required: [false]
  },
  cost: {
    type: Number,
    required: [false]
  },
  patients: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  }],
  officeAddress: {
    type: String,
    required: [false]
  },
  appointments: [{
    type: String,
    required: [false]
  }],
});

module.exports = mongoose.model('User', userSchema);