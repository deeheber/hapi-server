const Book = require('../models/book');
const Boom = require('boom');
const Joi = require('joi');

const catchErrors = require('../util/catchErrors');

const books = [
  {
    method: 'GET',
    path: '/api/books',
    handler: async () => {
      const books = await Book.find();
      return books;
    },
    config: {
      description: 'Get all books',
      tags: ['api']
    }
  },
  {
    method: 'GET',
    path: '/api/books/{id}',
    handler: async (req) => {
      const book = await Book.findById(req.params.id);
      if (!book) {
        throw Boom.notFound();
      }
      return book;
    },
    options: {
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
    handler: async (req) => {
      const newBook = await new Book(req.payload).save();
      return newBook;
    },
    options: {
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
    handler: async (req) => {
      const updated = await Book
        .findByIdAndUpdate(req.params.id, req.payload, { 
          new: true, 
          runValidators: true
        });
      if (!updated) {
        throw Boom.notFound();
      }
      return updated;
    },
    options: {
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
    handler: async (req) => {
      const deleted = await Book.findByIdAndRemove(req.params.id);
      if (!deleted) {
        throw Boom.notFound();
      }
      return deleted;
    },
    options: {
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
