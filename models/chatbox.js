const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
   user1: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
   },
   user2: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
   },
   message: [
      {
         user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
         },

         content:{
         type: String,
         required: true
         }
      }
   ]
},{
   timestamps: true
});

const ChatBox = mongoose.model('ChatBox',chatSchema);
module.exports = ChatBox;