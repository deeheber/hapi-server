const config = {
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 3000,
  db_uri: process.env.DB_URI || 'mongodb://localhost/books',
};

module.exports = config;