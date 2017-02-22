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
    path: '/{param*}',
    handler: {
      directory: {
        path: '.',
        //redirectToSlash: true,
        index: true
      }
    },
    config: {
      description: 'Serves static files in /public folder'
    }
  },
  {
    method: 'GET',
    path: '/api/books',
    handler: (req, res) => {
      Book.find()
        .then(books => res(books))
        .catch(err => res(Boom.badRequest(err)));
    },
    config: {
      description: 'Get all books'
    }
  },
  {
    method: 'GET',
    path: '/api/books/{id}',
    // add validation stuff here to make sure book exists in db
    // validate the id param
    handler: (req, res) => {
      Book.findById(req.params.id)
        .then(book => res(book))
        .catch(err => res(Boom.badRequest(err)));
    },
    config: {
      description: 'Get a single book by ._id'
    }
  },
  {
    method: 'POST',
    path: '/api/books',
    // add validation stuff here for req.payload
    handler: (req, res) => {
      new Book(req.payload).save()
        .then(saved => res(saved))
        .catch(err => res(Boom.badRequest(err)));
    },
    config: {
      description: 'Add a new book'
    }
  },
  {
    method: 'PUT',
    path: '/api/books/{id}',
    // add validation stuff for req.payload and the id
    handler: (req, res) => {
      Book.findByIdAndUpdate(req.params.id, req.payload, { 
        new: true, 
        runValidators: true
      })
        .then(updated => res(updated))
        .catch(err => res(Boom.badRequest(err)));
    },
    config: {
      description: 'Update info in a book'
    }
  },
  {
    method: 'DELETE',
    path: '/api/books/{id}',
    // add validation stuff -> make sure book id is valid & exists
    handler: (req, res) => {
      console.log(req.params);
      Book.findByIdAndRemove(req.params.id)
        .then(deleted => res(deleted))
        .catch(err => res(Boom.badRequest(err)));
    },
    config: {
      description: 'Delete a book'
    }
  }
];

module.exports = books;
