/*eslint arrow-parens: [2, "as-needed", { "requireForBlockBody": true }]*/
/*eslint-env es6*/
const mongoose = require('mongoose');
const Fawn = require('fawn');
const express = require('express');

const { Rental, validate } = require('../models/rental');
const { Movie } = require('../models/movie');
const { Customer } = require('../models/customer');

const router = express.Router();

Fawn.init(mongoose);

// CRUD

/* jshint ignore:start */

// Get List of rental

router.get('/', async (req, res) => {
  // const {error} = validate(req.body);
  // if(error) return res.status(400).send(error.details[0].message);
  
  const rentals = await Rental.find().sort('movie.title');
  res.send(rentals);
});

// Create New Rental

router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const movie = await Movie.findById(req.body.movieId);
    if(!movie) return res.status(404).send("Requested Movie Id was not found .... ");

    const customer = await Customer.findById(req.body.customerId);
    if(!customer) return res.status(404).send("Requested Customer Id was not found .... ");

    const rental = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            //  isGold: customer.isGold,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    });

    try {
        new Fawn.Task()
        .save('rentals', rental)
        .update('movies', { _id: movie._id }, {
            $inc: {
                numberInStock: -1
            }
        })
        .run() // 구동

        res.send(rental);
    }catch(ex){
        res.status(500).send(`Error ... ${ex.message}`);
    }
});


// Update

router.put('/:id', async (req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    const movie = await Movie.findById(req.body.movieId);
    if(!movie) return res.status(404).send("Requested Movie Id was not found .... ");

    const customer = await Customer.findById(req.body.customerId);
    if(!customer) return res.status(404).send("Requested Customer Id was not found .... ");

    const rental = await Rental.findByIdAndUpdate(req.params.id, {
        customer: {
            _id: customer._id,
            name: customer.name,
            //  isGold: customer.isGold,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    },
    { new: true });

    if(!rental) return res.status(404).send("Requested Rental ID was not found ... ");

    res.send(rental);
})


// Read

router.get('/:id', async (req, res) => {
    // const {error} = validate(req.body);
    // if(error) return res.status(400).send(error.details[0].message);

    const rental = await Rental.findById(req.params.id);
    if(!rental) return res.status(404).send("Requested Rental ID was not found ... ");

    res.send(rental);
});

// Delete

router.delete('/:id', async (req, res) => {
    const rental = await Rental.findByIdAndDelete(req.params.id);
    if(!rental) return res.status(404).send("Requested Rental ID was not found ... ");

    res.send(rental);
});

/* jshint ignore:end */


module.exports = router;