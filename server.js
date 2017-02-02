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
    path: '/hello/{name?}',
    handler: (req, res) => {
      if(req.params.name) return res(`Hi ${req.params.name}`);
      return res(`Hey stranger`);
    }
  },
  {
    method: 'GET',
    path: '/bye/{name?}',
    handler: (req, res) => {
      if(req.params.name) return res(`Bye ${req.params.name}`);
      return res(`Bye stranger`);
    }
  },
  {
    method: 'GET',
    path: '/query',
    handler: (req, res) => {
      console.log(req.query);
      if(req.query.id) return res(`query string is ${req.query.id}`);
      return res(`No query string recreived`);
    },
    config: {
      description: 'Query string test',
      notes: 'If there\'s an id query it will print it out'
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