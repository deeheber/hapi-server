const Code = require('code');   // assertion library
const Lab = require('lab');
const lab = exports.lab = Lab.script();

const server = require('../server');

lab.test('returns true when 1 + 1 equals 2', (done) => {
  Code.expect(1 + 1).to.equal(2);
  done();
});

lab.experiment('HTTP tests', () => {
  lab.test('Healthcheck', done => {
    const options = {
      method: 'GET',
      url: '/health'
    };

    server.inject(options, response => {
      Code.expect(response.statusCode).to.equal(200);
      Code.expect(response.result).to.equal('Server is working. Yay!');
      done();
    });
    
  });
});