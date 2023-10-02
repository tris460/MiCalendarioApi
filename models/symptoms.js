const { notesSchema } = require('./notes');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const symptomSchema = new Schema({
  date: {
    type: Date,
    required: [true]
  },
  periodStarts: {
    type: Boolean,
    required: [false]
  },
  periodEnds: {
    type: Boolean,
    required: [false]
  },
  emergencyPill: {
    type: Boolean,
    required: [false]
  },
  viagra: {
    type: Boolean,
    required: [false]
  },
  testicularPain: {
    type: Boolean,
    required: [false]
  },
  bald: {
    type: Boolean,
    required: [false]
  },
  pregnant: {
    type: Boolean,
    required: [false]
  },
  pregnancyWeeks: {
    type: Number,
    required: [false]
  },
  contraceptives: {
    type: [String],
    required: [false]
  },
  condom: {
    type: Boolean,
    required: [false]
  },
  orgasm: {
    type: Boolean,
    required: [false]
  },
  sexualActs: {
    type: Number,
    required: [false]
  },
  temperature: {
    type: Number,
    required: [false]
  },
  emotions: {
    type: String,
    required: [false]
  },
  symptoms: {
    type: String,
    required: [false]
  },
  weight: {
    type: Number,
    required: [false]
  },
  height: {
    type: Number,
    required: [false]
  },
  water: {
    type: Number,
    required: [false]
  },
  sleep: {
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
