module.exports = handler => (req, res) =>
  handler(req, res)
    .then(res)
    .catch(err => {
      req.log(['error'], err.message);
      res(err);
    });