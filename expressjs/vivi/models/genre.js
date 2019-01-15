const Joi = require('joi');
const mongoose = require('mongoose');

const { logger } = require('../util');

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  }
});

const Genre = mongoose.model('Genre', genreSchema);

function validateGenre(genre) {
  const scheme = {
    name: Joi.string().min(2).max(50).required()
  };

  return Joi.validate(genre, scheme);
}

exports.genreSchema = genreSchema;
exports.Genre = Genre;
exports.validate = validateGenre;