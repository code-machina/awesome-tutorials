const Joi = require('joi');
const { movieSchema } = require('./movie');
const { customerSchema } = require('./customer');
const mongoose = require('mongoose');


const rentalSchema = new mongoose.Schema({
    // movie: {
    //     type: movieSchema,
    //     required: true
    // },
    // moive: {
    //     type: new mongoose.Schema({
    //         title: {
    //             type: String,
    //             required: true,
    //             trim: true,
    //             minlength: 5,
    //             maxlength: 255
    //         },
    //         dailyRentalRate: {
    //             type: Number,
    //             required: true,
    //             min: 0,
    //             max: 255,
    //         }
    //     }),
    //     reuiqred: true,
    // },
    // customer: {
    //     type: customerSchema,
    //     required: true,
    // },
    // rentalDay: {
    //     type: Number,
    //     min: 1,
    //     required : true,
    //     max: 30
    // }
    customer: { 
        type: new mongoose.Schema({
          name: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 50
          },
          isGold: {
            type: Boolean,
            default: false
          },
          phone: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 50
          }      
        }),  
        required: true
      },
      movie: {
        type: new mongoose.Schema({
          title: {
            type: String,
            required: true,
            trim: true, 
            minlength: 5,
            maxlength: 255
          },
          dailyRentalRate: { 
            type: Number, 
            required: true,
            min: 0,
            max: 255
          }   
        }),
        required: true
      },
      dateOut: { 
        type: Date, 
        required: true,
        default: Date.now
      },
      dateReturned: { 
        type: Date
      },
      rentalFee: { 
        type: Number, 
        min: 0
      }
});

const Rental = mongoose.model('Rental', rentalSchema);

function validateRental(rental){
    const schema = {
        // rentalDay: Joi.number().min(1).max(30).required(),
        movieId: Joi.string().required(),
        customerId: Joi.string().required()
    };

    return Joi.validate(rental, schema);
}

exports.rentalSchema = rentalSchema;
exports.Rental = Rental;
exports.validate = validateRental;