const { Movie, validate } = require('../models/movie');
const { Genre } = require('../models/genre');

const express = require('express');

const router = express.Router();

/* jshint ignore:start */
// List of movie
router.get('/', async (req, res) => {
  const movies = await Movie.find().sort('title');

  res.send(movies);
});

// Create a movie
router.post('/', async (req, res) => {
  const {error} = validate(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if(!genre) return res.status(404).send("Specified Genre ID was not found ... ");

  // 새로운 Movie object 생성
  let movie = new Movie({
    title : req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name
    },
    numberInStock : req.body.numberInStock,
    dailyRentalRate : req.body.dailyRentalRate
  });

  movie.save();

  res.send(movie);
});

// Update
router.put('/:id', async (req, res) => {
  const {error} = validate(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if(!genre) return res.status(404).send("Requested Genre ID was not found ... ");

  const movie = await Movie.findByIdAndUpdate(req.params.id, {
    title : req.body.title,
    genre : {
      _id: genre._id,
      name: genre.name
    },
    numberInStock : req.body.numberInStock,
    dailyRentalRate : req.body.dailyRentalRate
  }, {new:true});
  if(!movie) return res.status(404).send("Requested movie id was not found ... ");

  res.send(movie);
});

// Delete
router.delete('/:id', async (req, res) => {
  const movie = await Movie.findByIdAndRemove(req.params.id);
  if(!movie) return res.status(404).send("Requested movie id was not found ... ")

  res.send(movie);
});

// Read one
router.get('/:id', async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if(!movie) return res.status(404).send("Requested movie id was not found ... ")
  res.send(movie);
})

/* jshint ignore:end */

module.exports = router;