# Summary of Express.js 

vivi is a tutorial project for summarizing a basic concept of express.js.
vivi 는 express.js 의 기본 개념을 요약하기 위한 튜토리얼 프로젝트입니다.

## Express Project Basic Structure

### Main Module

프로젝트 root 디렉토리에서 index.js 로 시작합니다.
express 앱의 기본 구조는 아래와 같습니다.

```javascript
const express = require('express');

const app = express();

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
```

### Routes Folder

express.use 를 이용하면 용도별로 기능을 분리할 수 있습니다. 이는 한 파일에 모든 코드를 압축하는 것 보다 효과적인 코드 관리를 가능하게 합니다.

```javascript
/* ------ File : /index.js ----- */
const retails = require('./routes/retails'); 
const express = require('express');
const app = express();

app.use('/api/retails', retails)

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

/* ------- File : /routes/retails.js ------- */
const express = require('express');
const router = express.Router();
router.post('/', async (req, res) => {
  // ... 생략
})
```

### Models Folder

모델링은 REST API 를 구현하는데 있어 매우 중요한 요소입니다. 데이터 정의와 유효성 검증을 수행하도록 구성합니다. 이때 `joi`, `mongoose` 모듈을 사용합니다.

mongoose 를 통해서 `Schema`, `model` 각각 생성합니다. 그리고 아래의 예에서 생성된 Customer 모델은 `exports` 문을 통해서 객체를 export 합니다.

```javascript
const Joi = require('joi');
const mongoose = require('mongoose');

const Customer = mongoose.model('Customer', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  //.... 생략
});

exports.customerSchema = customerSchema;
exports.Customer = Customer; 
exports.validate = validateCustomer;
```

# Module require

|name|info|
|:---:|:---:|
|mongoose| ODM(mongodb object modeling) for MongoDB  |
|express| Web application framework |
|joi| Object Schema Description |
|nodemon| a tool that helps develop node.js |
|debug| tiny debugging tools for development of node.js |
|moment-timezone|`npm install moment-timezone` 타임존 설정할 때 유용|
|morgan|HTTP Request Logger middleware for node.js|
|joi-objectid| Validation for invalid ObjectId which is provided by user |
|lodash| javascript 객체 작업을 한결 수월하게 해주는 모듈 |
|joi-password-complexity| joi 모듈의 확장으로 패스워드 복잡도 설정 가능 |
|bcrypt| 패스워드 해쉬에 사용 |
|jsonwebtoken| JWT 모듈 |
|express-async-errors| 비동기 express 에러 핸들링를 전역적으로 추가 |
|winston| logging module |
|winston-mongodb| logging module that specialized in MongoDB Persistence |

## Language Support Modules

|name|info|
|:---:|:---:|
|jshint| 전역 설치 (`npm i -g jshint`) / jshint plugin (vscode) |

## jshint

jshint 는 vscode 를 통해서 개발할 때 syntax 를 체크해 줍니다.

.jshintrc 파일을 생성하여 아래와 같이 쓰고 있습니다. 파일은 json 타입입니다.

```json
{ "esversion":6 }
```

## mongoose

mongoDB 에 엑세스하고 데이터를 CRUD 할 떄에 mongoose 가 필요합니다. 

## express

express 웹 어플리케이션 프레임워크를 이용해서 서버 프로그래밍이 가능합니다.

## joi 

express 프레임워크에서 삽입된 데이터가 유효한지(validation check)를 검증합니다.

## nodemon 

express 개발에 도움을 주는 툴입니다. (전역 설치 권장 : npm i -g nodemon)

## debug

debug 툴을 사용하여 메시지를 아름답계 남길 수 있다.

## moment-timezone

`moment-timezone` 을 이용하여 KST 계산을 정확히 수행할 수 있다. 자세한 내용은 [Docs of moment.js](https://momentjs.com/timezone/docs/) 를 참조한다.

```javascript
var moment = require('moment-timezone');
moment().tz("America/Los_Angeles").format();
```

## morgan

HTTP Request 를 로깅할 때 사용하는 미들웨어 모듈이다.

```javascript
morgan('tiny')
```

## joi-objectid

joi 모듈에 mongoose 의 objectid 를 검증하는 확장 모듈이다. 소스의 index.js 파일에 아래와 같이 선언한 뒤에 별도의 선언 없이 사용 가능하다.

```javascript
/****** Filename  : src/index.js  *****/
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

/// 생략 ... 
```

## lodash

> A modern JavaScript utility library delivering modularity, performance & extras.

```javascript
const _ = require('lodash'); // 전통적으로 _(underscore) 로 변수명을 정의 (사용하기 편함)

// pick 메서드를 통해서 원하는 property 를 뽑아내어 객체를 만들 수 있음
let user = new User({
  name: req.body.name,
  email: req.body.email,
  password: req.body.password
})
user = _.pick(user, ['name', 'email', 'password']);

```

## bcrypt 

패스워드를 Hash화 하는 모듈, 설치를 위해 빌드 툴이 필요하며 정상 설치 후에 `bcrypt` 모듈을 설치한다.

```bash
npm install --global --production windows-build-tools
npm install bcrypt --save
```

```javascript
const salt = await bcrypt.genSalt(10);
const hashed = await bcrypt.hash('1234', salt);
```

## jsonwebtoken

일명 JWT 토큰을 구현해주는 모듈

```bash
npm i --save jsonwebtoken
```

### set header as jwtwebotken

```javascript
const token = jwt.sign({ _id: user._id }, config.get('jwtPrivateKey'));
res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
```

## express-async-errors 

비동기로 동작하는 route handler 의 에러를 처리하기 위해 asyncMiddleware 를 작성하고 이 함수가 기존의 handler 함수를 
전달 받아 실행하는 것을 구현하였다. 내용은 아래의 코드와 같다.

만약, MongoDB 등의 Database Server 가 중단되는 상황 혹은 express 자체의 에러가 발생하는 경우 `asyncMiddleware` 와 정의한
오류 처리 로직을 통해 에러를 처리하는 미들웨어(가장 마지막에 선언된 미들웨어)에서 `Something failed.` 라는 메시지를 남기게 된다.

그러나 모든 핸들러(`handler`)에 `asyncMiddleware`를 작성하는 것은 그다지 바람직하지 않은 선택이다. `express-async-erros` 모듈은 직접 에러를 처리하지 않는다. 대신 `asyncMiddleware` 와 같이 비동기 에러 처리를 처리하기 위한 wrapping 함수를 사용하지 않고 동일한 에러처리 로직을 구현할 수 있도록 도와 준다. `require('express-async-errors');` 코드를 `/index.js` 파일의 맨 상단에 기입해 주면된다.

이후에는 우리가 정의하는 `./middleware/error.js` 모듈로 에러를 전달하게 되고 가장 마지막 미들웨어인 이 함수는 전달 받은 에러를 처리한다.

- 비동기 에러 처리를 위해 새로운 함수를 정의하고 이 레퍼런스를 리턴하는 함수를 만들었다. 이는 파이썬과 비슷한 방식의 처리이다. (decorator 방식)

```javascript
/* file: middleware/async.js */
module.exports = function asyncMiddleware(handler) {
  return async (req, res, next) => {
    try {
      await handler(req, res);
    }
    catch(ex){
      next(ex);
    }
  };
}
```

- 영화 장르에 대한 리스트를 요청 시 MongoDB 서비스가 구동 중이 아니라면 에러가 발생할 것이다. 이 에러를 처리하기 위해 async.js 파일에서 정의한 에러 핸들링 템플릿 코드를 아래와 같이 사용한다.

```javascript
/* file: routes/genres.js */

router.get('/', asyncMiddleware(async (req, res) => {
  const genres = await Genre.find().sort('name')
  res.send(genres);
}));
```

- 미들웨어 정의는 에러 처리 및 메시지 출력, 그리고 로깅 등의 기능에 필수적이다.

```javascript
/* file: middleware/error.js */
module.exports = function(err, req, res, next) {
  // Log the exception
  res.status(500).send('Something failed.');
};
```

- 메인 코드에서는 정의한 미들웨어를 아래와 같이 붙인다.

```javascript
/* file: /index.js */
// At the top of this document.
const error = require('./middleware/error');

// 생략 ....

app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use(error); // Always PUT Error Handling Middleware at the end of routes.
```

- `express-async-errors`를 사용하게 되면 결국은 이렇게 된다.

```javascript
require('express-async-errors');
// 생략 ... 
app.use(error);
// The end of code bunch that register middleware and route handler.
```

## winston, winston-mongodb

Logging Module to log any error message from express application. so we can check all the error message from logging file.
Now Let's see the detailed code in the below code section. 

- CUATION
  - winston module have been changed greatly. So some documents wouldn't match with current version. therefore always check the public documentation so that you won't be confused with some subtle differences.


```javascript
/* file: /index.js */

const winston = require('winston'); // logging module to file.
// CAUTION:: You must import the winston-mongodb module after importing winston module.
require('winston-mongodb'); // enabled mongodb Transports Feature...

// Skipping irrelevant code ... 

// files object enable winston to log errors into file.
const files = new winston.transports.File({ filename: 'winston-logfile.log' });
// console object enable winston to log errors into terminal
const console = new winston.transports.Console();
// console object enable winston to log errors into mongodb
const mongodb = new winston.transports.MongoDB( {db: 'mongodb://localhost/vivi', useNewUrlParser: true});
winston.add(files);
winston.add(mongodb);

// Skipping irrelevant code ... 

```

```javascript
/* file: middleware/error.js */
const winston = require('winston');

module.exports = function(err, req, res, next) {
  // Log the exception
  // winston.log('error', err.message);
  // or, // winston.error(err.message, err); // with metadata
  winston.error(err.message, err);

  // error
  // warn
  // info 
  // verbose
  // debug
  // silly

  res.status(500).send('Something failed.');
};
```

## 



# How to test 

postman 을 통해서 REST API 를 테스트하고 있습니다. 그러나 다른 테스트 모듈이 필요할지도 모르겠습니다.


# vscode 팁

`"javascript.suggestionActions.enabled": false` 를 설정하여 아래의 syntax-highlighting 을 제거한다.

> [ts] File is a CommonJS module; it may be converted to an ES6 module.

# jshint 팁

## [jshint] Await, Async Syntax Error

jshint 를 사용할 때, Async, Await 를 사용할 경우 에러가 발생한다. 코딩할 때 거슬리기 때문에 `JSHINT IGNORE` 를 사용하여 경고를 해제한다.

- [StackOverflow : does-jshint-support-async-await](https://stackoverflow.com/questions/42637630/does-jshint-support-async-await)

# 로그인 기능 : User Modeling

로그인 사용자 모델을 모델링해보자.

```json
email: {
  type: string 

}
```

# Information Expert Principle

mongoose 모듈을 이용해서 user 마다 jwt token 을 발생하는 메서드를 아래와 같이 정의한다. 아래와 같은 방식은 매우 효율적인 방식으로 
권장 된다. (꿀팁 감사용~ :) )

```javascript
/** models/user.js */
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

// 생략

/** routes/users.js */
// 아래와 같이 토큰을 생성할 때에 MongoDB 에서 Fetched 된 객체에 generateAuthToken 메서드를 호출하여 jwt 토큰을 자연스럽게 생성가능하다.
const token = user.generateAuthToken();
res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
```

# Authentication using JWT(jsonwebtokens)

인증을 위해 로그인 그리고 로그 아웃을 구현해야 한다. 그러나 JWT 를 사용할 경우 DB 에 JWT 토큰을 저장하지 않는 것을 가이드한다. 따라서, 다음의 조건을 통해
유효하지 않은 정보의 입력에 대응한다. 

- 로그 아웃
  - 기능을 구현하지 않음 (토큰에 대한 어떠한 정보도 서버에 저장하지 않는다.)
- Token Expiration 
  - Expiration 에 대한 정책(Policy)를 설정하여 필터에 반영한다.
- 로그인
  - 유효한 인증 정보가 입력될 경우 JWT 토큰을 발행한다.
- 권한
  - 슈퍼 관리자는 매우 막강한 존재이다. 새로운 권한을 생성하고 이를 타 사용자에게 자유롭게 할당할 수 있다. 
  - 권한 관리는 매우 중요한 요소이다. 특히 특정 페이지에 접근할 때 이것이 중요하다.
  - 권한의 종류 
    - READ
    - WRITE/MODIFY
  - 그렇다면 권한은 어떻게 관리되어야 하는가?

|사용자|권한||
|:---:|:---:|:---:|
|machi18na|SUPERADMIN|권한 부여 관리자, 승인 관리자|
|machi19na|ADMIN|국지적 권한 부여 관리자, 승인 관리자|

SUPERADMIN 은 권한만을 부여할 수 있는 관리자이다. 이는 즉 siteadmin 을 의미한다. siteadmin 은 별도의 행위를 할 수 없다.

```javascript
[
  {
    name: "machi18na",
    role: [
      { 
        _id:ObjectId(/*....*/),
        name: 'SUPERADMIN'
      }, 

    ], // 
  }, 
  {
    name: "machi19na",
    role: [
      {
        _id:ObjectId(/*....*/),
        name: ""
      }
    ]
  }
]
```


# How to handle uncauted exception

우리는 전역적인 에러 핸들러를 등록하여 예기치 않은 상황에 대비할 수 있습니다. 
즉, 모든 에러를 수집하고 담는 코드를 작성하여 이를 기반으로 디버깅 작업이 진행합니다. 

이를 위해서는 `process` 객체를 사용하여 `uncaughtException` 을 처리해야 하며 리스너로 anonymous function 을 등록합니다. 위에서 소개한 `winston`은 에러 로깅을 수행합니다. 

우리가 만약 중대한 에러가 발생할 경우 에러 처리를 하지 않고 어플리케이션을 셧다운한다고 가정해봅니다. 이 때 가장 중요한 문제점은 처리되지 않은 에러로 인해서 디버깅 능력과 모니터링 능력을 잃는 것입니다. 즉, 디버깅을 할 정보가 부족한 것이죠 이 때에는 디버깅 정보를 쌓아두고 사용자 경험의 악화를 감수할 필요가 있다고 생각됩니다. 

```javascript
/* file: /index.js */

process.on('uncaughtException', (ex) => {
  console.log(" WE GOT AN UNCAUGHTED EXCEPTION .... ");
  winston.error(ex.message, ex);
});

throw new Error("Uncaughted Exception is occured.....");
```