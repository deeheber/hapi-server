const Book = require('../models/book');
const Boom = require('boom');
const Joi = require('joi');

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
      description: 'Get all books',
      tags: ['api']
    }
  },
  {
    method: 'GET',
    path: '/api/books/{id}',
    handler: (req, res) => {
      Book.findById(req.params.id)
        .then(book => res(book))
        .catch(err => res(Boom.badRequest(err)));
    },
    config: {
      validate: {
        params: Joi.object().keys({
          id: Joi
            .string()
        })
      },
      description: 'Get a single book by ._id',
      tags: ['api']
    }
  },
  {
    method: 'POST',
    path: '/api/books',
    handler: (req, res) => {
      new Book(req.payload).save()
        .then(saved => res(saved))
        .catch(err => res(Boom.badRequest(err)));
    },
    config: {
      validate: {
        payload: Joi.object().keys({
          title: Joi
            .string()
            .required(),
          author: Joi
            .string()
            .optional(),
          purchaseDate: Joi
            .date()
            .optional(),
          complete: Joi
            .boolean()
            .truthy('true')
            .falsy('false')
            .default('false')
            .optional()
        })
      },
      description: 'Add a new book',
      tags: ['api']
    }
  },
  {
    method: 'PUT',
    path: '/api/books/{id}',
    handler: (req, res) => {
      Book.findByIdAndUpdate(req.params.id, req.payload, { 
        new: true, 
        runValidators: true
      })
        .then(updated => res(updated))
        .catch(err => res(Boom.badRequest(err)));
    },
    config: {
      validate: {
        params: Joi.object().keys({
          id: Joi
            .string()
        }),
        payload: Joi.object().keys({
          title: Joi
            .string()
            .optional(),
          author: Joi
            .string()
            .optional(),
          purchaseDate: Joi
            .date()
            .optional(),
          complete: Joi
            .boolean()
            .truthy('true')
            .falsy('false')
            .default('false')
            .optional()
        })
      },
      description: 'Update info in a book',
      tags: ['api']
    }
  },
  {
    method: 'DELETE',
    path: '/api/books/{id}',
    handler: (req, res) => {
      console.log(req.params);
      Book.findByIdAndRemove(req.params.id)
        .then(deleted => res(deleted))
        .catch(err => res(Boom.badRequest(err)));
    },
    config: {
      validate: {
        params: Joi.object().keys({
          id: Joi
            .string()
        })
      },
      description: 'Delete a book',
      tags: ['api']
    }
  }
];

module.exports = books;
