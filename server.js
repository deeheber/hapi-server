const Path = require('path');
const Hapi = require('hapi');
const config = require('./config/config');
const database = require('./config/database');
const routeList = require('./routes/books.js');

// create server and connect static file directory
const server = new Hapi.Server({
  connections: {
    routes: {
      files: {
        relativeTo: Path.join(__dirname, 'public')
      }
    }
  }
});

server.connection({
  host: config.host,
  port: config.port,
  router: {
    stripTrailingSlash: true
  }
});

// add plugins
server.register([
  require('inert'),
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

module.exports = server;