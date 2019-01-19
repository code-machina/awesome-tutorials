const config = require('config');

module.exports = function() {
    if (!config.get('jwtPrivateKey')) {
        // logger('app', 'jwtPrivateKey is not defined [CRITICAL_ERROR]');
        // process.exit(1);
        throw new Error('[CRITICAL_ERROR] vivi_jwtPrivateKey is not defined');
      }
}