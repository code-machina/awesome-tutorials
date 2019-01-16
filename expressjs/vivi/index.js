/* express 서버 / index.js
 * 작성자 : code-machina
 */

// 기본 모듈
const express = require('express');
const mongoose = require('mongoose');
// HTTP Request Logging middleware
const morgan = require('morgan');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

// 라우트 모듈
const customers = require('./routes/customers');
const genres = require('./routes/genres');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');

// 유틸 모듈
const { logger, loggerMiddleware } = require('./util');

// express 인스턴스
const app = express();

// MongoDB 연결
// TODO: mongoDB connection string 을 configuration 파일을 통해서 설정
mongoose.connect('mongodb://localhost/vivi', { useNewUrlParser: true })
  .then(() => logger('db', 'Connected MongoDB ....'))
  // .then(() => dbdebug('MongoDB 연결 ... '))
  .catch(err => logger('db', 'Failed to connect MongoDB ....'));

// express.json() 
app.use(express.json());

// middleware to log every request by user.
// app.use(loggerMiddleware);
// ::1 - - [15/Jan/2019:03:17:32 +0000] "GET /api/genres/5c3d4194fc34ca1004de63a62 HTTP/1.1" 404 33 "-" "PostmanRuntime/7.6.0"
app.use(morgan('combined')); 


/* routes 등록 */
app.use('/api/customers', customers);
app.use('/api/genres', genres);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);

logger('app', 'Configurating Routes is Successful ... ');

/* app listening on ${express.env.PORT} */
const port = process.env.PORT || 3000;
app.listen(port, () => logger('app', `Listening on port ${port}... `));