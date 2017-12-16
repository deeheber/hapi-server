const Book = require('../models/book');
const Boom = require('boom');
const Joi = require('joi');

const catchErrors = require('../util/catchErrors');

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
    handler: catchErrors(async (req, res) => {
      const books = await Book.find();
      return books;
    }),
    config: {
      description: 'Get all books',
      tags: ['api']
    }
  },
  {
    method: 'GET',
    path: '/api/books/{id}',
    handler: catchErrors(async (req, res) => {
      const book = await Book.findById(req.params.id);
      if (!book) {
        throw Boom.notFound();
      }
      return book;
    }),
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
    handler: catchErrors(async (req, res) => {
      const newBook = await new Book(req.payload).save();
      return newBook;
    }),
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
    handler: catchErrors(async (req, res) => {
      const updated = await Book
        .findByIdAndUpdate(req.params.id, req.payload, { 
          new: true, 
          runValidators: true
        });
      if (!updated) {
        throw Boom.notFound();
      }
      return updated;
    }),
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
    handler: catchErrors(async (req, res) => {
      const deleted = await Book.findByIdAndRemove(req.params.id);
      if (!deleted) {
        throw Boom.notFound();
      }
      return deleted;
    }),
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
