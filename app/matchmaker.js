var shuffle = require('knuth-shuffle').knuthShuffle;

var Matchmaker = function(chatList) {
  this.chatList = chatList;
};

Matchmaker.prototype.generate = function() {
  if (this.chatList.chats.length < 30) {
    return null;
  }
  var randomIndices = [];
  var match = {
    answers: []
  };

  while(randomIndices.length < 5) {
    var num = Math.floor(Math.random() * this.chatList.chats.length);
    if (randomIndices.indexOf(num) === -1) {
      randomIndices.push(num);
    }
  }
  randomIndices.forEach(function(chatListIndex, randIndex) {
    var chat = this.chatList.chats[chatListIndex];
    match.answers.push(chat.value.message);
    if (!randIndex) {
      match.rightAnswer = chat.value.message;
      match.gif = chat.value.media;
    }
  }.bind(this));

  match.answers = shuffle(match.answers.slice(0));
  return match;
};

module.exports = Matchmaker;
