const { Genre, validate } = require('../models/genre');
const express = require('express');

const { logger } = require('../util');

const router = express.Router();

/* jshint ignore:start */
// List genre
router.get('/', async (req, res) => {
  const genres = await Genre.find().sort('name')

  res.send(genres);
});

// Create
router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({
    name : req.body.name
  });

  genre = await genre.save()
  logger('app',`${genre} is saved successfully ... `)

  res.send(genre);
  
});

// Update 
router.put('/:id', async (req, res) => {
  const { error } = validate(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findOneAndUpdate(req.param.id, {
    name: req.body.name
  },{new: true});

  if(!genre) return res.status(404).send("Given genreId was not found ... ");

  res.send(genre);
});

// Delete
router.delete('/:id', async (req, res) => {
  const genre = await Genre.findOneAndDelete(req.param.id);
  if(!genre) return res.status(404).send('Given genre Id was not found ... ');

  res.send(genre);
});

// Read One
router.get('/:id', async (req, res) => {
  const genre = await Genre.findById(req.param.id);
  if(!genre) return res.status(404).send('Given genre Id was not found ... ');
  
  res.send(genre);
})

module.exports = router;