const validateObjectId = require('../middleware/validateObjectId');
const asyncMiddleware = require('../middleware/async');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { Genre, validate } = require('../models/genre');
const express = require('express');
const mongoose = require('mongoose');

const { logger } = require('../util');

const router = express.Router();

/* jshint ignore:start */



// List genre
// router.get('/', asyncMiddleware(async (req, res) => {
router.get('/', async (req, res) => {
  // throw new Error("Could not get any document from DB");
  // try {
  //   const genres = await Genre.find().sort('name')
  //   res.send(genres);
  // }catch(ex){
  //   // Log the exception ... 
  //   // res.status(500).send('Something failed.');
  //   next(ex);
  // }
  const genres = await Genre.find().sort('name')
  res.send(genres);
});

// Create 
// FIXME: middleware 함수를 추가하였음
// router.post('/', auth, asyncMiddleware(async (req, res) => {
router.post('/', auth, async (req, res) => {
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

  const genre = await Genre.findByIdAndUpdate(req.params.id, {
    name: req.body.name
  },{new: true});

  if(!genre) return res.status(404).send("Given genreId was not found ... ");

  res.send(genre);
});

// Delete
router.delete('/:id', [auth, admin], async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);
  if(!genre) return res.status(404).send('Given genre Id was not found ... ');

  res.send(genre);
});

// Read One
// FIXME: req.params.id 의 유효성 검증을 위해 ../middleware/validateObjectId.js 를 생성하여 
// 미들웨어 리스트에 추가하였음.
router.get('/:id', validateObjectId, async (req, res) => {
  // if(!mongoose.Types.ObjectId.isValid(req.params.id))
  //   return res.status(404).send('Given genre Id is invalid ... ')
  
  const genre = await Genre.findById(req.params.id);
  if(!genre) return res.status(404).send('Given genre Id is not found ... ');
  
  res.send(genre);
})

module.exports = router;  