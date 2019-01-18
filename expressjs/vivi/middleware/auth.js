const jwt = require('jsonwebtoken');
const config = require('config');
const { logger } = require('../util');

function auth(req, res, next) {  
  // 헤더로부터 x-auth-token 을 가져온다.
  const token = req.header('x-auth-token');
  // 헤더 값이 없다면 오류를 반환
  if(!token) return res.status(401).send('Access Denied. No token provided.');

  // JWT 검증 구간
  try{
    // JWT 디코딩 정보를 가져온다. 만약 유효하지 않은 경우는 에러를 리턴한다.
    const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
    // 디코딩된 정보를 req 의 user 객체에 전달하고 
    // req.user._id 와 같이 접근 가능하다.
    req.user = decoded; 
    // 다음 미들웨어를 호출하면서 auth 함수를 종료한다.
    next(); // call next middleware function

  }catch(ex) { 
    // 유효하지 않은 Token 을 수신할 경우 아래와 같이 리턴한다.
    logger('app', '[Middleware] Invalid Token');
    return res.status(400).send('Invalid Token.');
  }
}

module.exports = auth;
// export 는 위와 같은 방식 뿐만아니라 
// or 
// 아래와 같이 할 수 있다.
// module.exports = function(req, res, next) { /** ... (생략) */}