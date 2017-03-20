const env = require('get-env')({
  staging: 'staging',
  test: 'test',
});

// defaults to 'dev'
module.exports = require(`./config/${env}`);
module.exports.secret = 'NeedToChange';
module.exports.privateKey = 'NeedToChange';
