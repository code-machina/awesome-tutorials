const _ = require('lodash'); // underscore is clean & pretty convention...
const { logger } = require('../util');
const { User, validate } = require('../models/user');
const mongoose = require('mongoose');
const Fawn = require('fawn');
const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();

/* jshint ignore:start */
// Create User
router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  // email 중복체크 코드 
  let user = await User.findOne({ email: req.body.email });
  // FIXME: 보안상의 이슈가 있을 수 있으므로 정책을 수정할 것.
  if(user) return res.status(400).send('User Already Registered. ');
  
  user = new User({
    name : req.body.name,
    email : req.body.email,
    password: req.body.password
  });

  // await user.save(user);
  await user.save(_.pick(req.body, ['name', 'email', 'password']));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();
  logger('app',`${user} is saved successfully ... `)

  // lodash(_) 를 이용해서 'name', 'email' 프로퍼티만을 추출하는 pick 메서드를 호출
  
  // res.send({
  //   name: user.name,
  //   email: user.email
  // });
  res.send(_.pick(user, ['name', 'email']));
});

/** jshint ignore:end */

module.exports = router;