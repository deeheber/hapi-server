const Path = require('path');

const basic = [
  {
    method: 'GET',
    path: '/health',
    handler: (req) => {
      return 'Server is working. Yay!';
    }
  },
  {
  method: 'GET',
  path: '/{param*}',
  handler: {
    directory: {
      path: Path.join(__dirname, '..', 'public')
    }
  }
  }
];

module.exports = basic;
