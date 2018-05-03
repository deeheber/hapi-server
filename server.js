const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const Good = require('good');
const HapiSwagger = require('hapi-swagger');
const version = require('./package').version;
const config = require('./config/config');
const database = require('./config/database');
const basicRoutes = require('./routes/basic');
const bookRoutes = require('./routes/books.js');

// create server with a host and port
const server = Hapi.server({
  host: 'localhost',
  port: config.port
});

// Start the server
const init = async ()=> {
  try {
    // Add plugins
    await server.register([
      Inert,
      Vision,
      { plugin: HapiSwagger,
        options: {
          info: {
            'title': 'Book API',
            version
          },
          basePath: '/api'
        }
      },
      { plugin: Good,
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
    ]);

    // Add routes
    server.route(basicRoutes.concat(bookRoutes));

    // Start server
    await server.start();

    // Connect to database
    database.connect(config.db_uri);

    console.log(`Server running at: ${server.info.uri}`);
  }
  catch (err) {
    console.log(err);
    process.exit(1);
  }
}

init();

module.exports = server;
