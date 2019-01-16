const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // 사용자 이름
  name: { 
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  }
});

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({ _id: this._id }, config.get('jwtPrivateKey'));
  return token;
};

// arrow function 은 this 객체를 참조할 수 없음에 주의
// userSchema.methods.generateAuthToken = () => {
//   const token = jwt.sign({ _id: this._id }, config.get('jwtPrivateKey'));
// };

// ODM 객체를 생성
const User = mongoose.model('User', userSchema);

// 입력된 User 객체 데이터의 유효성을 검증
function validateUser(user) {
  const scheme = {
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),    
  };

  return Joi.validate(user, scheme);
}

// 사용할 객체, 함수를 export 하여 외부에서 사용한다.
exports.User = User;
exports.validate = validateUser;