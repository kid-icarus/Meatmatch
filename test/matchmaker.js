var should = require('chai').should();
var Matchmaker = require('../app/matchmaker');
var ChatList = require('../app/chatList');

var fillChatList = function(chatList, n) {
  for(var i = 0; i < n; i++) {
    chatList.push({
      key: 'key-' + i,
      value: {
        message: 'message-' + i,
        media: 'media-' + i
      }
    });
  }
};

describe('Matchmaker', function() {
  beforeEach(function() {
    this.chatList = new ChatList();
    this.matchmaker = new Matchmaker(this.chatList);
  });

  describe('#generate', function() {
    describe('without minimum number of chats', function() {
      beforeEach(function() {
        fillChatList(this.chatList, 29);
        this.match = this.matchmaker.generate();
      });

      it('returns undefined', function() {
        should.equal(this.match, null);
      });
    });

    describe('with a minimum number of chats', function() {
      beforeEach(function() {
        fillChatList(this.chatList, 30);
        this.match = this.matchmaker.generate();
      });

      it('returns a match object', function() {
        this.match.gif.should.exist;
        this.match.rightAnswer.should.exist;
        this.match.answers.should.be.an('array');
      });
    });
  });
});
