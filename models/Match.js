const mongoose = require('mongoose');

const MatchSchema = new mongoose.Schema({
  userId: {
    //relacionamos el usuario con su id autogenerado por mongoose en la db
    type: String,
    ref: 'user', //referencia al modelo del usuario
  },
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'char' }],
  winnerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'char',
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Match = mongoose.model('match', MatchSchema);
