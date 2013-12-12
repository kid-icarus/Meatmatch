require('newrelic');
var express = require('express');
var app = express();
var nconf = require('nconf').argv().env().file('config.json');
var ChatList = require('./app/chatList');
var ChatStream = require('./app/chatStream');
var Matchmaker = require('./app/matchmaker');
var chatList = new ChatList();
var chatStream = new ChatStream(chatList, nconf);
var matchmaker = new Matchmaker(chatList);

require('./app/settings')(app, nconf);
require('./app/routes')(app, matchmaker);
app.listen(nconf.get('PORT'));
