var express = require('express');
var path = require('path');

module.exports = function(app, nconf) {
  app.set('views', path.resolve(__dirname, '..', 'views'));
  app.set('view engine', 'jade');
  app.set('view options', { layout: false });
  app.use(express.static(path.resolve(__dirname, '..', 'public')));
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({
    secret: nconf.get('COOKIE_SECRET'),
    key: 'meatsess',
    store: new express.session.MemoryStore()
  }));
  app.use(app.router);
};
