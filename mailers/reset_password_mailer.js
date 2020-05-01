const nodeMailer = require('../config/nodemailer');

exports.passwordResetMail = (useremail) => {
    let htmlString =nodeMailer.renderTemplate({resetPassword: useremail}, '/password/resetPassword.ejs')

    console.log(useremail);

    nodeMailer.transporter.sendMail({
        from: 'sagargupta1417@gmail.com',
        to: useremail,
        subject: 'Change Your Password',
        html: htmlString
    }, (err, info) => {
        if(err){
            console.log('Error in sending Email', err);
            return;
        }

        console.log('message sent', info);
        return;
    });
}