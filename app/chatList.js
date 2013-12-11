var ChatList = function() {
  this.chats = [];
};

ChatList.prototype.push = function(chat) {
  if (chat.value.message) {
    this.chats.push(chat);
  }
  if (this.chats.length > 200) {
    this.chats.shift();
  }
}


ChatList.prototype.pop = function() {
  return this.chats.pop();
}

module.exports = ChatList;
