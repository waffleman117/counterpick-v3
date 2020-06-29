const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CharSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Char = mongoose.model('char', CharSchema);
