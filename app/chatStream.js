var socketClient = require('socket.io-client');

var ChatStream = function(chatList, nconf) {
  this.chatList = chatList;
  this.socket = socketClient.connect(nconf.get('SOCKET_URL'));
  this.socket.on('message', this.handleMessage.bind(this));
};

ChatStream.prototype.handleMessage = function(data) {
  this.chatList.push(data.chat);
};

module.exports = ChatStream;
