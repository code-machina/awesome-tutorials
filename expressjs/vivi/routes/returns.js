const Joi = require('joi');
const {Rental} = require('../models/rental');
const {Movie} = require('../models/movie');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

/* jshint ignore:start */
// TDD 할 때는 Joi 를 쓰려고 하지 않는다. 나중에 Refactoring 할 때 적용할 것이다.
router.post('/', [ auth, validate(validateReturn) ], async (req, res) => {
  // Recfactor Again ! validation 코드를 미들웨어로 옮긴다.
  // // Refactoring validation code.
  // const { error } = validateReturn(req.body);
  // if(error) return res.status(400).send(error.details[0].message);

  // if(!req.body.customerId) return res.status(400).send('CustomerId is not provided');
  // if(!req.body.movieId) return res.status(400).send('MovieId is not provided');

  // Static 과 Instance 의 예
  // Static : Rental.lookup 
  // Instance : new User().generateAuthToken()

  const rental = await Rental.lookup(req.body.customerId, req.body.movieId)

  if(!rental) return res.status(404).send('Rental not Found.');

  if(rental.dateReturned) return res.status(400).send('Return already processed.')

  // Information Expert Principle
  // user.js 와 마찮가지로 
  rental.return();
  await rental.save();

  // Update first approach
  await Movie.update({ _id : rental.movie._id }, {
    $inc: {
      numberInStock: 1
    }
  });

  // return res.status(200).send(rental);
  // 위의 코드와 아래의 코드는 동일하다.
  return res.send(rental);
});

function validateReturn(returned) {
  const scheme = {
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required(),
  };

  return Joi.validate(returned, scheme);
}

module.exports = router;