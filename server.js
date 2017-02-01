const Hapi = require('hapi');

//create server
const server = new Hapi.Server();
server.connection({
  host: 'localhost',
  port: 8000
});

//add routes
const routeList = [
  {
    method: 'GET',
    path: '/hello',
    handler: (req, res) => {
      return res('Hello World!');
    }
  },
  {
    method: 'GET',
    path: '/bye',
    handler: (req, res) => {
      return res('Goodbye World!');
    }
  },
  {
    method: 'POST',
    path: '/hello2/{name}',
    handler: (req, res) => {
      return res(`Hey there ${req.params.name}`);
    }
  }
];
// server.route({
//   method: 'GET',
//   path: '/hello',
//   handler: (req, res) => {
//     return res('Hello World!');
//   }
// });

server.route(routeList);

//start server
server.start(err => {
  if(err) throw err;
  console.log(`Server running at: ${server.info.uri}`);
});