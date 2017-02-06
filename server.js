const Hapi = require('hapi');
const config = require('./config/config');
const database = require('./config/database');
const routeList = require('./routes/books.js');


// create server
const server = new Hapi.Server();

server.connection({
  host: config.host,
  port: config.port
});

// add plugins
server.register([
  {
    register: require('good'),
    options: {
      ops: {
        interval: 1000
      },
      reporters: {
        console: [
          {
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [{ log: '*', response: '*', request: '*' }]
          },
          {
            module: 'good-console'
          }, 
          'stdout'
        ]
      }
    }
  }
], err => {
  if (err) return console.error(err);
  // add routes
  server.route(routeList);

  // start server
  server.start(err => {
    if(err) throw err;
    console.log(`Server running at: ${server.info.uri}`);
    database.connect(config.db_uri);
  });
});
