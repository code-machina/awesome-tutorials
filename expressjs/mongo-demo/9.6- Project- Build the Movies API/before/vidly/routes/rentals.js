const {Rental, validate} = require('../models/rental');
const {Customer} = require('../models/customer');
const {Movie} = require('../models/movie')
const mongoose = require('mongoose');
const Fawn = require('fawn');
const express = require('express');
const router = express.Router();

Fawn.init(mongoose);

/* jshint ignore:start */
router.get('/', async (req, res) => {
    const rentals = await Rental.find().sort('-dateOut');
    res.send(rentals);
  });
  
  router.post('/', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    
    // get a genre document from MongoDB and then insert it into a movie document.
    // so take the genreId parameter from requestBody, pass the id and name to Movie constructor
    const customer = await Customer.findById(req.body.customerId);
    if(!customer) return res.status(400).send('Invalid customer.');
    const movie = await Movie.findById(req.body.movieId);
    if(!movie) return res.status(400).send('Invalid movie.');
    // 실제 프로젝트에서 genre 오브젝트는 50여가지의 프로퍼티를 가진다.
    // 이를 모두 저장하는 것은 비현실적이다. 따라서, id 와 name 만을 저장한다.
    let rental = new Rental({ 
        // rentalDay: req.body.rentalDay,
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        },
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone,
        }
      });
    // rental = await rental.save();
    
    // // 영화 재고 수량을 줄이는 아래의 코드는 에러를 발생 시킨다.
    // // 이는 동시에 두가지 요청을 처리함에 따라 발생한다.
    // // 이때 필요한 것이 transaction 이다.
    // // mongodb two pase commits
    // movie.numberInStock--;
    // movie.save(); 
    try {
      new Fawn.Task()
      .save('rentals', rental)
      .update('movies', { _id : movie._id}, {
        $inc: {
          numberInStock: -1
        }
      })
      .run();

      res.send(rental);
    }catch(ex){
      res.status(500).send("Someting Failed...");
    }
  });
  
  router.put('/:id', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);
    if(!customer) return res.status(400).send('Invalid customer.');
    const movie = await Movie.findById(req.body.movieId);
    if(!movie) return res.status(400).send('Invalid movie.');
  
    const rental = await Rental.findByIdAndUpdate(req.params.id, 
        { 
            rentalDay: req.body.rentalDay,
            movie: {
                _id: movie._id,
                title: movie.title
            },
            customer: {
                _id: customer._id,
                name: customer.name
            }
        },     
      { new: true });
  
    if (!rental) return res.status(404).send('The rental with the given ID was not found.');
    
    res.send(rental);
  });
  
  router.delete('/:id', async (req, res) => {
    const rental = await Rental.findByIdAndRemove(req.params.id);
  
    if (!rental) return res.status(404).send('The movie with the given ID was not found.');
  
    res.send(rental);
  });
  
  router.get('/:id', async (req, res) => {
    const rental = await Rental.findById(req.params.id);
  
    if (!rental) return res.status(404).send('The movie with the given ID was not found.');
  
    res.send(rental);
  });
  

module.exports = router;