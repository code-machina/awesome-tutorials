const {Movie, validate} = require('../models/movie');
const {Genre} = require('../models/genre');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

/* jshint ignore:start */
router.get('/', async (req, res) => {
  const movies = await Movie.find().sort('title');
  res.send(movies);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  
  // get a genre document from MongoDB and then insert it into a movie document.
  // so take the genreId parameter from requestBody, pass the id and name to Movie constructor
  const genre = await Genre.findById(req.body.genreId);
  if(!genre) return res.status(400).send('Invalid genre.');
  // 실제 프로젝트에서 genre 오브젝트는 50여가지의 프로퍼티를 가진다.
  // 이를 모두 저장하는 것은 비현실적이다. 따라서, id 와 name 만을 저장한다.
  let movie = new Movie({ 
      title: req.body.title,
      genre: {
          _id: genre._id,
          name: genre.name
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate
    });
  movie = await movie.save();
  res.send(movie);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  const genre = await Genre.findById(req.body.genreId);
  if(!genre) return res.status(400).send('Invalid genre');

  const movie = await Movie.findByIdAndUpdate(req.params.id, 
    { 
      title: req.body.title,
      genre: {
          _id: genre._id,
          name: genre.name
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate
    },     
    { new: true });

  if (!movie) return res.status(404).send('The movie with the given ID was not found.');
  
  res.send(movie);
});

router.delete('/:id', async (req, res) => {
  const movie = await Movie.findByIdAndRemove(req.params.id);

  if (!movie) return res.status(404).send('The movie with the given ID was not found.');

  res.send(movie);
});

router.get('/:id', async (req, res) => {
  const movie = await Movie.findById(req.params.id);

  if (!movie) return res.status(404).send('The movie with the given ID was not found.');

  res.send(movie);
});

module.exports = router;