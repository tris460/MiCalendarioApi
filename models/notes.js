const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const notesSchema = new Schema({
  date: {
    type: Date,
    required: [true]
  },
  title: {
    type: String,
    required: [true]
  },
  note: {
    type: String,
    required: [true]
  },
});

module.exports = {
  notesSchema
}
