const mongoose = require('mongoose');
const config = require('config');
// 유틸 모듈
const { logger, loggerMiddleware } = require('../util');

module.exports = function() {
    // MongoDB 연결
    // TODO: mongoDB connection string 을 configuration 파일을 통해서 설정
    const db = config.get('db');
    mongoose.connect(db, { useNewUrlParser: true })
    .then(() => logger('db', `Connected to ${db} ....`));
    // .then(() => dbdebug('MongoDB 연결 ... '))
   //  .catch(err => logger('db', 'Failed to connect MongoDB ....'));
}