const Book = require('../models/book');
const Boom = require('boom');
//const Joi = require('joi');

const books = [
  {
    method: 'GET',
    path: '/health',
    handler: (req, res) => {
      return res('Server is working. Yay!');
    }
  },
  {
    method: 'GET',
    path: '/api/books',
    handler: (req, res) => {
      Book.find()
        .then(books => res(books))
        .catch(err => res(Boom.badRequest(err)));
    }
  },
  {
    method: 'GET',
    path: '/api/books/{id}',
    handler: (req, res) => {
      // add validation stuff here to make sure book exists in db
      Book.findById(req.params.id)
        .then(book => res(book))
        .catch(err => res(Boom.badRequest(err)));
    }
  },
  {
    method: 'POST',
    path: '/api/books',
    handler: (req, res) => {
      // add validation stuff here for req.payload
      new Book(req.payload).save()
        .then(saved => res(saved))
        .catch(err => res(Boom.badRequest(err)));
    }
  },
  {
    method: 'PUT',
    path: '/api/books/{id}',
    handler: (req, res) => {
      // add validation stuff here for req.payload
      Book.findByIdAndUpdate(req.params.id, req.payload, { 
        new: true, 
        runValidators: true
      })
        .then(updated => res(updated))
        .catch(err => res(Boom.badRequest(err)));
    }
  },
  {
    method: 'DELETE',
    path: '/api/books/{id}',
    handler: (req, res) => {
      // add validation stuff here -> make sure book id is valid & exists
      console.log(req.params);
      Book.findByIdAndRemove(req.params.id)
        .then(deleted => res(deleted))
        .catch(err => res(Boom.badRequest(err)));
    }
  }
];

module.exports = books;
