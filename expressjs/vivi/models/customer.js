const Joi = require('joi');
const mongoose = require('mongoose');

// ODM 을 위한 Schema 를 작성한다.
const customerScheme = new mongoose.Schema({
  // 사용자 이름
  name: { 
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  // Gold, 일반 회원으로 분류 Gold 회원인 경우 
  // isGold 필드를 true 로 설정
  isGold: {
    type: Boolean,
    default: false
  },
  // 회원 연락처를 남긴다.
  phone: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  }
});

// ODM 객체를 생성
const Customer = mongoose.model('Customer', customerScheme);

// 입력된 Customer 객체 데이터의 유효성을 검증
function validateCustomer(customer) {
  const scheme = {
    name: Joi.string().min(5).max(50).required(),
    phone: Joi.string().min(5).max(50).required(),
    isGold: Joi.boolean()
  };

  return Joi.validate(customer, scheme);
}

// 사용할 객체, 함수를 export 하여 외부에서 사용한다.
exports.Customer = Customer;
exports.validate = validateCustomer;