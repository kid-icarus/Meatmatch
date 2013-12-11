module.exports = function(app, matchmaker) {
  app.get('/', function(req, res) {
    var match = matchmaker.generate();
    if (match) {
      req.session.match = match;
      res.render('index', { match: match });
    }
    else {
      res.render('warming');
    }
  });

  app.post('/', function(req, res) {
    res.render('results', {
      userAnswer: req.body.answer,
      match: req.session.match
    });
  });
};
