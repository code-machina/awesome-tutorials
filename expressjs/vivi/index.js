/* express 서버 / index.js
 * 작성자 : code-machina
 */

// 기본 모듈
const winston = require('winston');
const express = require('express');
const app = express(); // express 인스턴스

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();
require('./startup/prod')(app);

// 유틸 모듈
const { logger, loggerMiddleware } = require('./util');

//throw new Error("Uncaughted Exception is occured.....");

// Promise.Reject 오류 처리
// const p = Promise.reject(new Error('Something failed miserably..'));
// p.then(() => console.log('Done.'));

/* app listening on ${express.env.PORT} */
const port = process.env.PORT || 3000;
const server = app.listen(port, () => winston.info(`Listening on port ${port}... `));

module.exports = server;