const { User } = require('../../../models/user');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

describe('user.generateAuthTotken', () => {
  it('should return a valid JWT', () => {
    // User 생성
    const payload = {
      _id: new mongoose.Types.ObjectId().toHexString(), 
      isAdmin: true
    };
    const user = new User(payload);
    // 토큰 생성
    const token = user.generateAuthToken();
    const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
    // expect(decoded).toMatchObject({_id: 1, isAdmin: true}); // it would fail test.
    expect(decoded).toMatchObject(payload); // it would fail test.
  });
});