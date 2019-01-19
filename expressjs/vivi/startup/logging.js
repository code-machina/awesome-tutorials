const winston = require('winston'); // logging module to file.
// require('winston-mongodb'); // enabled mongodb Transports Feature...
require('express-async-errors');

module.exports = function() {
    winston.exceptions.handle(
        new winston.transports.Console({colorize: true, prettyPrint: true}),
        new winston.transports.File({ filename: 'uncaughtexception.log' })
      );
        
    // unhandledRejection 에러가 발생할 경우 노드 프로세스가 종료될 예정이다. 
    // 따라서, 아래와 같이 예외 처리를 전역적으로 해준다.
    process.on('unhandledRejection', (error) => {
        console.log(' WE GOT AN UNHANDLED REJECTION .... ');
        winston.error(error.message, error);
    });

    
    process.on('uncaughtException', (ex) => {
        // console.log(' WE GOT AN UNCAUGHTED EXCEPTION .... ');
        // console.log(ex);
        winston.error(ex.message, ex);
        process.exit(1);
    });
  
    // winston.add(new winston.transports.File(), {filename: 'logfile.log'});
    const files = new winston.transports.File({ filename: 'winston-logfile.log' });
    const console = new winston.transports.Console({colorize: true, prettyPrint: true});
    // const mongodb = new winston.transports.MongoDB({ db: 'mongodb://localhost/vivi', useNewUrlParser: true });
    winston.add(files);
    // winston.add(mongodb);
    winston.add(console);
};