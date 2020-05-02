 class mailSender{

    constructor(email){
        this.button = email;
        this.mailSendForm = $('#mail_send_form');
        this.sendEmail(email);
    }

    sendEmail(email){
        this.mailSendForm.submit(function(e){
            console.log(e);
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/users/send-mail',
                data: $(this).serialize(),
                success: function (data) {
                    console.log(data);
                    $('#notification').css("display", "block");
                    $(".container").css("padding-top","3%");
                }, error: function (error) {
                    console.log(error.responseText);
                }
            })
        })
    }
 }