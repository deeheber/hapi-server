const Path = require('path');
const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const Good = require('good');
const HapiSwagger = require('hapi-swagger');
const version = require('./package').version;
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
  port: config.port,
  router: {
    stripTrailingSlash: true
  },
  labels: ['api']
});

// add plugins
server.register([
  Inert,
  Vision,
  { register: HapiSwagger,
    options: {
      info: {
        'title': 'Book API',
        version
      },
      basePath: '/api'
    }
  },
  { register: Good,
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