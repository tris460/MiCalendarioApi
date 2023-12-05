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
    required: [false]
  },
  sex: {
    type: String,
    required: [true],
    default: 'female',
  },
  role: {
    type: String,
    required: [true],
    default: 'patient',
  },
  symptoms: [symptomSchema],
  pet: {
    type: String,
    required: [false],
    default: 'assets/pets/pet1.png'
  },
  doctor: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: [false]
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
    ref: 'Users',
    required: [false]
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