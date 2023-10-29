const { notesSchema } = require('./notes');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const symptomSchema = new Schema({
  bald: {
    type: Boolean,
    required: [false]
  },
  condom: {
    type: Boolean,
    required: [false]
  },
  contraceptives: {
    type: [String],
    required: [false]
  },
  date: {
    type: String,
    required: [true]
  },
  emergencyPill: {
    type: Boolean,
    required: [false]
  },
  emotions: [{
    type: String,
    required: [false]
  }],
  height: {
    type: Number,
    required: [false]
  },
  orgasm: {
    type: Boolean,
    required: [false]
  },
  periodEnds: {
    type: Boolean,
    required: [false]
  },
  periodStarts: {
    type: Boolean,
    required: [false]
  },
  pregnancyWeeks: {
    type: Number,
    required: [false]
  },
  pregnant: {
    type: Boolean,
    required: [false]
  },
  sexualActs: {
    type: Number,
    required: [false]
  },
  sleep: {
    type: Number,
    required: [false]
  },
  symptoms: [{
    type: String,
    required: [false]
  }],
  temperature: {
    type: Number,
    required: [false]
  },
  testicularPain: {
    type: Boolean,
    required: [false]
  },
  viagra: {
    type: Boolean,
    required: [false]
  },
  water: {
    type: Number,
    required: [false]
  },
  weight: {
    type: Number,
    required: [false]
  },
  notes: {
    type: notesSchema,
    required: [false]
  },
});

module.exports = {
  symptomSchema
}
