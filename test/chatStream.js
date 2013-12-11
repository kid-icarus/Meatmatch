var ChatStream = require('../app/chatStream');
var should = require('chai').should();
var io = require('socket.io').listen(8080, { log: false });
var nconf = require('nconf');
var ChatList = require('../app/chatList');

nconf.defaults({
  SOCKET_URL: 'http://localhost:8080'
});

describe('Chat Streamer', function() {
  before(function(done) {
    io.sockets.on('connection', function(socket) {
      this.socket = socket;
      done();
    }.bind(this));
    this.chatList = new ChatList();
    this.chatStream = new ChatStream(this.chatList, nconf);
  });

  it('pushes incoming messages to a ChatList', function(done) {
    this.chatStream.socket.on('message', function() {
      this.chatList.pop().should.exist;
      done();
    }.bind(this));
    this.socket.emit('message', { chat: { value: { message: 'test' }}});
  });
});

