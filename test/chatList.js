var ChatList = require('../app/chatList');
var should = require('chai').should();

var mockChat = function(message) {
  return {
    key: 'lorem',
    value: {
      message: message == null ? 'ipsum' : message,
      media: 'dolor'
    }
  };
};

describe('Chat List', function() {
  beforeEach(function() {
    this.chatList = new ChatList();
  });

  describe('#push', function() {
    beforeEach(function() {
      var chat = mockChat();
      chat.first = true;
      this.chatList.push(chat);
    });

    it('pushes a message into the chats array', function() {
      this.chatList.chats.should.have.length(1);
    });

    it('pops the oldest chat off after 200 chats', function() {
      for(var i = 0; i < 200; i++) {
        this.chatList.push(mockChat());
      }
      this.chatList.chats[0].should.not.have.property('first');
    });

    it('rejects chats with blank messages', function() {
      this.chatList.push(mockChat(''));
      this.chatList.pop().should.have.property('first');
    });
  });

  describe('#pop', function() {
    beforeEach(function() {
      this.chatList.push(mockChat());
      this.chat = this.chatList.pop();
    });

    it('returns a chat object', function(){
      this.chat.should.be.an('object');
    });

    it('pops off the chats array', function() {
      this.chatList.chats.should.have.length(0);
    });

    it('returns undefined if chatList is empty', function() {
      should.not.exist(this.chatList.pop());
    });
  });
});
