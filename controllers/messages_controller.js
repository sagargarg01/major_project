const User = require('../models/user');
const ChatBox = require('../models/chatbox');

module.exports.userChats = function(req, res){

   return res.render('messages',{
      title: "Messages"
   });
}

module.exports.texting = async function(req, res){

   return res.redirect('back');
}