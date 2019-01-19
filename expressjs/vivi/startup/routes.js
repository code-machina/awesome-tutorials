const express = require('express');
const error = require('../middleware/error');

// 라우트 모듈
const customers = require('../routes/customers');
const genres = require('../routes/genres');
const movies = require('../routes/movies');
const rentals = require('../routes/rentals');
const users = require('../routes/users');
const auth = require('../routes/auth');
const returns = require('../routes/returns');

// HTTP Request Logging middleware
const morgan = require('morgan');

// 유틸 모듈
const { logger, loggerMiddleware } = require('../util');

module.exports = function(app) {
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
    app.use('/api/returns', returns);
    app.use(error); // Always PUT Error Handling Middleware at the end of routes.

    logger('app', 'Configurating Routes is Successful ... ');
}