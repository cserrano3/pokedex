const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const PokemonSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  order: {
    type: Number,
    required: true,
  },
  trainer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true},
  species: {
    type: String,
    required: true,
    trim: true,
  },
  moves: {
    type: Array,
    required: true,
    validate: {
      validator: function(val) {
        return val.length <= 4;
      },
    },
  },
  type: {
    type: String,
    required: true,
    trim: true,
  },
  secondType: {
    type: String,
    trim: true,
  },
  nature: {
    type: String,
    required: true,
    trim: true,
  },
  level: {
    type: Number,
    required: true,
    validate: function(val) {

    },
  },
}).plugin(uniqueValidator);

const Pokemon = mongoose.model('Pokemon', PokemonSchema);

module.exports = {
  Pokemon, PokemonSchema,
};
