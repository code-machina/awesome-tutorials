const {
    Customer,
    validate
} = require('../models/customer');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


/* jshint ignore:start */
router.get('/', async (req, res) => {
    const customers = await Customer.find().sort('name');
    // genres.then(
    //   (result) => { res.send(result)}
    // ).catch((err) => console.log(err.message));
    res.send(customers);
});

router.post('/', async (req, res) => {
    const {
        error
    } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    });
    // genres.push(genre);
    customer = await customer.save();
    res.send(customer);
});
module.exports = router;