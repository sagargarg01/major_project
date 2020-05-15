const User = require('../models/user');
const ChatBox = require('../models/chatbox');

module.exports.userChats = async function(req, res){

   //first find yourself
   let user = await User.findById(req.params.id);

   //second find your chatlist id array 
   let chatRoomList = user.chatlist;

   // find your chatRoom and create an array with all your chatrooms 
   let allchatRooms = [];
   for(var room of chatRoomList){
      let eachRoom = await ChatBox.findById(room)
      .populate('user1' , 'name avatar')
      .populate('user2' , 'name avatar')
      allchatRooms.push(eachRoom);
   }

   return res.render('messages',{
      title: "Messages",
      chatlist:allchatRooms
   });
}

module.exports.texting = async function(req, res){

   return res.redirect('back');
}