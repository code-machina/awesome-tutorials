const jwt = require('jsonwebtoken');
const config = require('config');
const { logger } = require('../util');


function auth(req, res, next) {  
  const token = req.header('x-auth-token');
  if(!token) return res.status(401).send('Access Denied. No token provided.');
  try{

    const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
    // 디코딩된 정보를 req 의 user 객체에 전달하고 
    // req.user._id 와 같이 접근 가능하다.
    req.user = decoded; 
    
    next(); // call next middleware function

  }catch(ex) { 
    logger('app', '[Middleware] Invalid Token');
    return res.status(400).send('Invalid Token.');
  }
}

module.exports = auth;
// export 는 위와 같은 방식 뿐만아니라 
// or 
// 아래와 같이 할 수 있다.
// module.exports = function(req, res, next) { /** ... (생략) */}