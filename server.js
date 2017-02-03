const Hapi = require('hapi');
const routeList = require('./lib/routes/crud.js');

// create server
const server = new Hapi.Server();

server.connection({
  host: 'localhost',
  port: 8000
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
});

// add routes
server.route(routeList);

// start server
server.start(err => {
  if(err) throw err;
  console.log(`Server running at: ${server.info.uri}`);
});
