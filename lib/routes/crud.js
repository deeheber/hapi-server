const crud = [
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

module.exports = crud;
