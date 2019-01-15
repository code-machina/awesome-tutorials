// debug 모듈 선언
// 색깔이 들어간 디버그 메시지를 출력한다.
const appLog = require('debug')('app:startup');
const dbLog = require('debug')('app:db');

// 로그에 있어서 중요한 것은 시간일 것이다. moment 를 이용하여 KST 타임을 출력한다.
const moment = require('moment-timezone');

function getKST(){
  return moment().tz("Asia/seoul").format();
}

function logger(level, msg){
  // 타임스탬프를 생성
  if(level == 'app') {
    // app 관련 로그를 출력
    appLog(`[${getKST()} / app] : ${msg}` );
  } else if (level == 'db'){
    // db 관련 로그를 출력
    dbLog(`[${getKST()} / db] : ${msg}` );
  }
}

function loggerMiddleware(req, res, next) {
  // logging every request 
  logger('app', `${req.method} ${req.url} ${res.statusCode}`);
  // return to next middleware
  next();
}

exports.logger = logger;
exports.loggerMiddleware = loggerMiddleware;
