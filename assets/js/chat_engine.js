class chatEngine {
    constructor(chatBoxId, roomID, userEmail) {
        this.chatBox = $(`#${chatBoxId}`);
        this.roomID = roomID;
        this.userEmail = userEmail;

        this.socket = io.connect('http://localhost:5000');
        // this.socket = io.connect('http://34.239.110.28:5000');

        if (this.roomID && userEmail) {
            this.connectionHandler(this.roomID);
        }

    }

    connectionHandler(roomID) {
        let self = this;

        this.socket.on('connect', function () {
            console.log('connection established using sockets...!');


            self.socket.emit('join_room', {
                chatroom: roomID
            });

            self.socket.on('user_joined', function (data) {
                console.log('a user joined!', data);
            })


        });

        // CHANGE :: send a message on clicking the send message button
        $('#send-message').click(function () {
            let msg = $('#chat-message-input').val();

            if (msg != '') {
                self.socket.emit('send_message', {
                    message: msg,
                    user_email: self.userEmail,
                    chatroom: roomID
                });
            }
        });

        self.socket.on('receive_message', function (data) {
            console.log('message received', data.message);

            let messageType = 'other-message';

            if (data.user_email == self.userEmail) {
                messageType = 'self-message';
            }

            if (messageType === 'self-message') {
                // self - message
                $('#chat-messages-list').append(`<div class="outgoing_msg">
                <div class="sent_msg">
                   <p>${data.message}</p>
                   <span class="time_date"> 11:01 AM | June 9</span>
                </div>
             </div>`)
            }
            else {
                // other user message
                $('#chat-messages-list').append(`<div class="incoming_msg">
                <div class="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png"
                      alt="user">
                </div>
                <div class="received_msg">
                   <div class="received_withd_msg">
                      <p>${data.message}</p>
                      <span class="time_date"> 11:01 AM | June 100</span>
                   </div>
                </div>
             </div>`)
            }
        })
    }

}