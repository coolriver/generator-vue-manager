module.exports = {
  api: '/modules/boolean/true',
  response: (req, res) => {
    setTimeout(function() {
      res.send(true);
    }, 1000);
  },
};

