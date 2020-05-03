const User = require('../models/user');
const Post = require('../models/post');
const fs = require('fs');
const path = require('path');
const resetPasswordMailer = require('../mailers/reset_password_mailer');
const Password = require('../models/reset_password');

// keep it same as before
module.exports.profile = async function (req, res) {

    try {

        let user = await User.findById(req.params.id);

        let posts = await Post.find({ user: req.params.id })
            .sort('-createdAt')
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user likes',
                }
            }).populate('likes');

        return res.render('user', {
            title: user.name,
            profile_users: user,
            posts: posts
        });

    } catch (err) {
        console.log("ERROR", err);
    }




}

module.exports.update = async function (req, res) {
    //    if (req.user.id == req.params.id){
    //         User.findByIdAndUpdate(req.params.id, req.body , function(err, user){
    //             return res.redirect('back');
    //         });
    //     }else{
    //         return res.status(401).send('Unauthorized');
    //     }

    if (req.user.id == req.params.id) {

        try {

            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, function (err) {
                if (err) { console.log('***multer error', err); return; }

                user.name = req.body.name;
                user.email = req.body.email;

                if (req.file) {

                    if (user.avatar) {
                        fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                    }
                    // this is saving the path of the uploaded file into the avatar field in the user
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();

                return res.redirect('back');
            });

        } catch (error) {
            req.flash('error', err);
            return;
        }


    } else {
        req.flash('Unauthorized')
        return res.status(401).send('Unauthorized');
    }

}

// render the sign up page
module.exports.signUp = function (req, res) {

    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    });
}


// render the sign in page
module.exports.signIn = function (req, res) {

    if (req.isAuthenticated()) {
        return res.redirect('/users/profile/req.params.id');
    }

    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    });
}


// get the signup data
module.exports.create = function (req, res) {
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }

    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) { console.log('error in finding user in signing up'); return; }

        if (!user) {
            User.create(req.body, function (err, user) {
                if (err) { console.log('error in creating user while signing up'); return; }

                req.flash('success', 'User Created Successfully')
                return res.redirect('/users/sign-in');
            });
        }

        else {
            req.flash('error', 'User Already Exists');
            return res.redirect('back');
        }

    });
}


//sign in and create a session for the user
module.exports.createSession = function (req, res) {
    req.flash('success', 'Logged in Sucessfully');
    return res.redirect('/');
}

module.exports.destroySession = function (req, res) {
    req.flash('success', 'Logged out Sucessfully');

    req.logout();

    return res.redirect('/');
}

module.exports.Forgotten_password = function (req, res) {

    return res.render('forgotten_password', {
        title: "Forgotten Password"
    });

}

module.exports.find_user = async function (req, res) {

    try {
        let user = await User.findOne({ email: req.body.email })

        return res.render('verify_account', {
            title: "Reset Password",
            user: user
        });
    }
    catch (err) {
        console.log('Error', err);
        return;
    }

}

module.exports.send_mail = async function (req, res) {

    try {

        console.log()
        if (req.xhr) {

            resetPasswordMailer.passwordResetMail(req.body.email);

            return res.status(200).json({
                message: 'Mail Sent Sucessfully'
            });
        }

        req.flash('success', 'Mail Sent');
        res.redirect('back');
    }
    catch (err) {
        console.log('Error', err);
        return;
    }

}

module.exports.resetPassword = async function (req, res) {


    // /users/resetPassword/?accesstoken=abcd123
    try {
        let validate = await Password.findOne({ accesstoken: req.query.accesstoken });

        if (validate) {

            if (validate.isvalid) {
                let user = await User.findById(validate.user);

                return res.render('new_password_form', {
                    title: "New Password",
                    user: user,
                    accesstoken: req.query.accesstoken
                });
            }else {
                return res.send(`
        <h1> ERROR </h1>
        The page you are looking for does not exist
        `);
            }

        }
        else {
            return res.send(`
        <h1> ERROR </h1>
        The page you are looking for does not exist
        `);
        }
    }
    catch (err) {
        console.log('Error', err);
        return;
    }


}

module.exports.newPassword = async function (req, res) {

    try {
        if (req.body.password === req.body.cnfrmpassword) {

            let validate = await Password.findOne({ accesstoken: req.body.accesstoken });

            if (validate.isvalid) {
                let user = await User.findByIdAndUpdate(req.body.id, { password: req.body.password });

                validate.isvalid = false;
                validate.save();

                return res.redirect('/users/sign-in');
            }else {
                return res.send(`
        <h1> ERROR </h1>
        The page you are looking for does not exist
        `);
            }
        }
        else {
            return res.send(`
    <h1> ERROR </h1>
    The page you are looking for does not exist
    `);
        }
    }
    catch (err) {
        console.log('Error', err);
        return;
    }


}