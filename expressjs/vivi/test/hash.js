const bcrypt = require('bcrypt');
/* jshint ignore:start */

async function run() {
  // round 를 10 으로 설정
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash('1234', salt);
  console.log(salt);
  console.log(hashed);
}


run();