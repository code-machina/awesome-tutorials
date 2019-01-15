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
````


# How to test 

postman 을 통해서 REST API 를 테스트하고 있습니다. 그러나 다른 테스트 모듈이 필요할지도 모르겠습니다.


# vscode 팁

`"javascript.suggestionActions.enabled": false` 를 설정하여 아래의 syntax-highlighting 을 제거한다.

> [ts] File is a CommonJS module; it may be converted to an ES6 module.

# jshint 팁

## [jshint] Await, Async Syntax Error

jshint 를 사용할 때, Async, Await 를 사용할 경우 에러가 발생한다. 코딩할 때 거슬리기 때문에 `JSHINT IGNORE` 를 사용하여 경고를 해제한다.

- [StackOverflow : does-jshint-support-async-await](https://stackoverflow.com/questions/42637630/does-jshint-support-async-await)

