class chatEngine{
    constructor(chatboxId, userEmail){
        this.chatbox = $(`#${chatboxId}`);
        this.userEmail = userEmail;
    
    this.socket = io.connect('http://localhost:5000');

    if(this.userEmail){
        this.connectHandler();
    }
    }

    connectHandler(){
        this.socket.on('connect', function(){
            console.log('connection established using sockets.....!!!!');
        });
    }

    
     
}