const Book = require('../models/book');

const books = [
  {
    method: 'GET',
    path: '/hello/{name?}',
    handler: (req, res) => {
      if(req.params.name) return res(`Hi ${req.params.name}`);
      return res('Hey stranger');
    }
  },
    {
    method: 'POST',
    path: '/api/books',
    handler: (req, res) => {
      if(req.params.name) return res(`Hi ${req.params.name}`);
      return res('Hey stranger');
    }
  }
];

module.exports = books;
