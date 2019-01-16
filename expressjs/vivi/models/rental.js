const Joi = require('joi');
// require('joi-objectid')(Joi) 는 함수를 리턴한다.
// Joi.objectId 에 이 함수를 할당한다.
// Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');

const rentalSchema = new mongoose.Schema({
  customer: {
      type: new mongoose.Schema({
          name: {
              type: String,
              required: true,
              minlength: 5,
              maxlength: 50
          },
        //   isGold: {
        //       type: Boolean,
        //       default: false
        //   },
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
  // 대출 일자
  dateOut: {
      type: Date,
      required: true,
      default: Date.now
  },
  // 반환 일자
  dateReturned: {
      type: Date
  },
  // 대여 비용
  rentalFee: {
      type: Number,
      min: 0
  }
});

const Rental = mongoose.model('Rental', rentalSchema);
// FIXME: Joi.string().required() 를 Joi.objectId().required() 로 변경
function validateRental(rental) {
    const schema = {
        movieId: Joi.objectId().required(),
        customerId: Joi.objectId().required()
    };

    return Joi.validate(rental, schema);
}

exports.rentalSchema = rentalSchema;
exports.Rental = Rental;
exports.validate = validateRental;