# Basic Express.js

Basic Express.js

## nodemon

Support Hot-reloading

## process.env

windows

```bash
$> set PORT=5000
$> nodemon index.js
```

*nix
```bash
$> export PORT=5000
$> nodemon index.js
```

## how to express

### req, res

Every Restful Request has params on uri itself. So we can extract certain params in uri. just like below

```javascript
app.get('/api/student/:id', (req, res) => {
    req.params.id // access to param in the middle of uri.
    req.query // access to query string ?name=gbkim
})
```

### input validation

joi 라는 모듈을 통해서 쉽게 처리 가능하다. 

```bash
npm i joi
```

## helpful chrome extension

### json viewer

the extension would help you render the json object beautiful.