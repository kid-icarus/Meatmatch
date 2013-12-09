var ChatList = require('../app/chatList');
var should = require('chai').should();

describe('Chat List', function() {
  beforeEach(function() {
    this.chatList = new ChatList();
  });

  describe('#push', function() {
    beforeEach(function() {
      this.chatList.push({'first': true});
    });

    it('should push a message into the chats array', function() {
      this.chatList.chats.should.have.length(1);
    });

    it('should pop the oldest chat off after 200 chats', function() {
      for(var i = 0; i < 200; i++) {
        this.chatList.push({});
      }
      this.chatList.chats[0].should.not.have.property('first');
    });

  });

  describe('#pop', function() {
    beforeEach(function() {
      this.chatList.push({});
      this.chat = this.chatList.pop();
    });

    it('should return an object', function(){
      this.chat.should.be.an('object');
    });

    it('should pop off the chats array', function() {
      this.chatList.chats.should.have.length(0);
    });

    it('should return undefined if chatList is empty', function() {
      should.not.exist(this.chatList.pop());
    });

  });
});

