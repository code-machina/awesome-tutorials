# What concepts Vidly Sample would treat

- Middleware
- Configuration
- Debugging
- Templating Engines

## Middleware

`get` 메서드의 핸들러 영역 `(req, res) => {... }` 역시 엄밀하게 말하면 미들웨어(Middleware) 이다.

```javascript
app.get('/', (req, res) => {
    res.send('Hello World'); // 이 영역
})
```

아래의 코드 또한 마찬가지로 미들웨어(middleware)이다. `express.json()` 미들웨어는 body 의 json 객체를 파싱하기 위한 오브젝트이다. 아래의 간단한 순서도는 json 미들웨어가 개입할 경우 요청이 처리되는 파이프라인(`REQUEST PROCESSING PIPELINE`)을 다룬다.

==== request =====> \[Middleware/ json()\] ====> \[ Middleware/ route() \] ==== response ===>

```javascript
app.use(express.json()); // req.body
```

## Template Engine

Express 는 다양한 Template 엔진을 제공한다 그 중에 세개를 꼽아본다. 이 중 Mustache 는 Vue.js 를 할 때 언급된 내용이다.

- Pug
- Mustache
- EJS

## Database Integration

```bash
$> npm i mongodb
```

- required: Mongoose


