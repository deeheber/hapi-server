const Code = require('code');   // assertion library
const Lab = require('lab');
const lab = exports.lab = Lab.script();

const server = require('../server');

lab.experiment('HTTP tests', () => {
  // add code to clear the database here

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

  // lab.test('Creates a new book', done => {

  // });

  // lab.test('Creates a second book', done => {

  // });

  // lab.test('Gets book 1', done => {

  // });

  // lab.test('Gets all books', done => {

  // });

  // lab.test('Updates book 1', done => {

  // });

  // lab.test('Deletes book 2', done => {

  //  });

  // add code to clear the database and close the database connection here

});

