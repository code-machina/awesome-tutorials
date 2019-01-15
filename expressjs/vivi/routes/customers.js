/**
 * 회원 정보를 입력 받고 이를 Database 에 저장
 * 작성자: code-machina
 */

// ODM 모델을 임포트
const {Customer, validate} = require('../models/customer'); 
// logger 모듈을 임포트
const {logger} = require('../util');

// Router 객체
const express = require('express');
const router = express.Router();

// CRUD


/* jshint ignore:start */ // async 문에 대한 syntax highlighting 에러 처리
// LIST
router.get('/', async (req, res) => {

  const customers = await Customer.find().sort('name');
  res.send(customers);
});

// CREATE
router.post('/', async (req, res) => {
  // Request 유효성 검증
  const { error } = validate(req.body);
  if(error) return res.status(400).send(error.details[0].message); // 에러 출력

  // 파라미터로부터 Customer 모델 인스턴스 생성
  let customer = new Customer({
    name: req.body.name,
    isGold: req.body.isGold,
    phone: req.body.phone
  });

  // MongoDB 에 Model 을 저장
  customer = await customer.save()
  logger('app',`${customer} is saved successfully ... `)

  // 저장한 결과를 리턴
  return res.send(customer);
});

// Update
router.put('/:id', async (req, res) => {
  // 업데이트할 데이터를 검증
  const {error} = validate(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  // /:id => req.param.id
  // {new: true} : 신규로 갱신된 데이터를 리턴 (지정하지 않을 경우, 업데이트 이전의 데이터를 반환)
  const customer = await Customer.findByIdAndUpdate(req.param.id, {
    name: req.body.name,
    isGold: req.body.isGold,
    phone: req.body.phone
  }, {new: true})
  // 해당 객체를 찾지 못할 경우 404 에러를 리턴
  if(!customer) return res.status(404).send('Given customerId was not found ... ');

  res.send(customer);
});

// Delete
router.delete('/:id', async (req, res) => {
  // customerId 를 찾고 곧바로 삭제, 삭제된 데이터를 response 를 통해서 출력 (?)
  const customer = await Customer.findByIdAndDelete(req.param.id);
  if(!customer) return res.status(404).send('Given customerId was not found ... ');

  res.send(customer);
});

// Read One
router.get('/:id', async (req, res) => {
  // findOne 은 findById 와 같은 방식으로 쓰지 않는 듯하다.
  const customer = await Customer.findById(req.param.id);
  if(!customer) return res.status(404).send('Given customer Id was not foudn ... ');

  res.send(customer);
});

/* jshint ignore:end */

module.exports = router;