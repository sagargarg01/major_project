const User = require('../models/user');
const Friendship = require('../models/friendship');
const ChatRoom = require('../models/chatbox');

module.exports.createFriensdhip = async function (req, res) {

    //here what we did is we check if friend exists if not then we check if 
    /// there is already an chatroom for two users 
    // if not then we craeted a new room for them otherwise just creates new friendship

    try {
        let toUser = await User.findById(req.params.id);
        let fromUser = await User.findById(req.user.id);

        if (!fromUser.friendships.includes(req.params.id)) {
            //after creating friendship lets create there chatroom

            let isChatRoomExists = await ChatRoom.findOne({
                user1: req.params.id,
                user2: req.user.id
            });

            let checkForOtherWay;
            if (!isChatRoomExists) {
                  checkForOtherWay = await ChatRoom.findOne({
                    user1: req.user.id,
                    user2: req.params.id
                });
            }

            if(isChatRoomExists || checkForOtherWay){
                fromUser.friendships.push(req.params.id);
                fromUser.save();
    
                toUser.friendships.push(req.user.id);
                toUser.save();
            }

            else{
                let chatroom = await ChatRoom.create({
                    user1: req.params.id,
                    user2: req.user.id
                })
    
                fromUser.friendships.push(req.params.id);
                fromUser.chatlist.push(chatroom._id);
                fromUser.save();
    
                toUser.friendships.push(req.user.id);
                toUser.chatlist.push(chatroom._id);
                toUser.save();
    
            }
          
            req.flash('success', 'Friend Added Successfully');

        }
        else {
            req.flash('error', 'Friend Already Exist');
        }
        return res.redirect('back');

    } catch (err) {
        console.log("Error in creating friends", err);
        return res.redirect('back');
    }
}

module.exports.destroyFriendship = async function (req, res) {

    let reqFriend = await User.findById(req.user.id);
    let resFriend = await User.findById(req.params.id);

    let index = reqFriend.friendships.indexOf(req.params.id)
    reqFriend.friendships.splice(index, 1);
    reqFriend.save();

    index = resFriend.friendships.indexOf(req.user.id)
    resFriend.friendships.splice(index, 1);
    resFriend.save();

    req.flash('success', 'Friendship Deleted Successfully')
    return res.redirect('back');
}