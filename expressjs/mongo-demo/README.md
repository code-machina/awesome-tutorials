# Mongo-demo

MongoDB 를 사용하는 데모 실습 프로젝트

## vscode

`"javascript.suggestionActions.enabled": false` 를 설정하여 아래의 syntax-highlighting 을 제거한다.

> [ts] File is a CommonJS module; it may be converted to an ES6 module.

## MongoDB Connection String

아래의 링크에 따르면 Connection String 에 useNewUrlParser 옵션을 주어 아래의 경고를 해제한다.

> (node:16904) DeprecationWarning: current URL string parser is deprecated, and will be removed in a future version. To use the new parser, pass option { useNewUrlParser: true } to MongoClient.connect.
- [Stackoverflow: avoid-current-url-string-parser-is-deprecated-warning-by-setting-usenewurlpars](https://stackoverflow.com/questions/50448272/avoid-current-url-string-parser-is-deprecated-warning-by-setting-usenewurlpars)

```javascript
mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true } )
```

## [jshint] Await, Async Syntax Error

jshint 를 사용할 때, Async, Await 를 사용할 경우 에러가 발생한다. 코딩할 때 거슬리기 때문에 `JSHINT IGNORE` 를 사용하여 경고를 해제한다.

- [StackOverflow : does-jshint-support-async-await](https://stackoverflow.com/questions/42637630/does-jshint-support-async-await)

