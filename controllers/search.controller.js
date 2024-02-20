const { request, response } = require('express');

const search = (req = request, res = response) => {
  // const { q = '' } = req.query;

  res.json({
    msg: 'search',
    // q,
  });
};

module.exports = {
  search,
};
