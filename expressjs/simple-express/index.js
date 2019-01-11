const startupDebugger = require('debug')('app:startup')
const dbDebugger = require('debug')('app:db');
const config = require('config'); // config 폴더에 정의한 prod, dev 에 대한 설정을 쉽게 로드한다.

const logger = require('./logger')
const helmet = require('helmet') // HTTP 헤더 보안 설정을 해준다. (xssFilter, csp 와 같은 헤더 설정)
const morgan = require('morgan') // logging 
const express = require('express');

const courses = require('./routes/courses')
const home = require('./routes/home')
const app = express();

// 내부적으로 pug 를 로드한다.
app.set('view engine', 'pug')
app.set('views', './views'); // default
// 환경이 복잡해지면 `개발` 과 `배포` 에 따른 환경설정이 필요하다.

console.log(`NODE_ENV: ${process.env.NODE_ENV}`); // undefined
console.log(`app: ${app.get('env')}`)

// post 메서드를 처리하기 위해 반드시 정의해야 한다.
app.use(express.json()); 

// urlencoded 미들웨어는
// post 의 x-wwww-form 형식을 req.body 로 접근 가능하도록 변환해 준다.
app.use(express.urlencoded({extended: true})); // x-www-form-urlencoded -> req.body
// public 폴더의 컨텐츠를 접근할 수 있도록 해준다.
app.use(express.static('public'));
// useful express middleware 1
app.use(helmet());

app.use('/api/courses', courses);
app.use('/',home)

if (app.get('env') == 'development') {
    // 개발 환경에서만 morgan 으로 로깅한다고 가정하자.
    // console 상에 access 로그가 찍힌다.
    app.use(morgan('tiny'));
    console.log('Morgan enabled...')
    // set DEBUG=app:startup
    startupDebugger('Morgan enabled....')
}
// set DEBUG=app:startup,app:db
// set DEBUG=app:*
// 아래는 한줄 명령어 코드이다. (윈도우 쉘)
// set DEBUG=app:db && nodemon index.js
// 아래는 리눅스 계열 쉘 한줄 코드이다.
// DEBUG=app:db nodemon index.js 
dbDebugger('Connected to the database.....');
// Configuration

console.log('Application Name : ' + config.get('name'));
console.log('Mail Server : ' + config.get('mail.host'));

// set app_password=1234
console.log('Mail Password : ' + config.get('mail.password'));

// npm rc 11 million downloads (very popular)
// npm config 6 hundreds thousands times ()

// useful

// 사용자 정의 미들웨어(Middleware)1
/* app.use(function(req, res, next) {
    console.log('Logging...');
    next();
}); */

// 위의 코드 대신에 logger.js 를 정의하여 사용할 수 있다.
// 결과는 동일하다.
app.use(logger);

// 사용자 정의 미들웨어(Middleware)2
app.use(function(req, res, next) {
    console.log('Authenticating...');
    next();
});





const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`))