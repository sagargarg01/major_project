const User = require('../models/user');
const Friendship = require('../models/friendship');


module.exports.createFriensdhip = async function (req, res) {

    try{
    let toUser = await User.findById(req.params.id);
    let fromUser = await User.findById(req.user.id);

    let isFriend = false;
    let existingfriends = toUser.friendships
    console.log(existingfriends);
    // let existingfriends = fromUser.friendships;

    // for (let friend of existingfriends) {
    //     if (friend == req.params.id) {
    //         isFriend = true;
    //         break;
    //     }
    // }

    // if (!isFriend) {
    //     let friends = await Friendship.create({
    //         from_user: req.user.id,
    //         to_user: toUser.id
    //     });

    //     fromUser.friendships.push(req.params.id);
    //     fromUser.save();
    //     toUser.friendships.push(req.user.id);
    //     toUser.save();


    //     req.flash('success', 'Friend Added Successfully');
    // }
    // else{
    //     req.flash('error', 'Friend Already Exist');
    // }

    return res.redirect('back');

    }catch(err){
        console.log("Error in creating friends", err);
        return res.redirect('back');
    }

}

module.exports.destroyFriendship = async function(req, res){

    // let friend1 = await User.findById(req.params.id);
    // let friend2 = await User.findById(req.user.id);
    // let friendship;
    // friendship = await Friendship.findOne({
    //     from_user: friend2.id,
    //     to_user:friend1.id
    // })

    // if(friendship == null)
    // friendship = await Friendship.findOne({
    //     from_user: friend1.id,
    //     to_user: friend2.id
    // })

    // // friendship.remove();

    
    // friend2.friendships.f()

    // console.log(friend1)

    // req.flash('success' , 'Friendship Deleted Successfully')
    return res.redirect('back');
}