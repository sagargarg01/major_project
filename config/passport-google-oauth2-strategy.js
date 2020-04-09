const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

// tell passport to use a new strategy for google login
passport.use(new googleStrategy({
        clientID: "396921753627-pcndn1gv2fcktrpupapgl0cikced4osl.apps.googleusercontent.com",
        clientSecret: "RSSypTDP8t7oDMgObJmCRbbt",
        callbackURL: "http://localhost:8000/users/auth/google/callback"
    },

    function(accessToken, refreshToken, profile, done){
        User.findOne({email: profile.emails[0].value}).exec(function(err, user){
            if(err){console.log("Error in google strategy passport", err); return;}
            
            console.log(profile);

             //if found, set the user as req.user
            if(user){
                return done(null, user);
                // if not found, create the user and set it as req.user
            }else{
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    passport: crypto.randomBytes(20).toString('hex')
                }, function(err, user){
                    if(err){console.log("Error in google strategy passport", err); return;}

                    return done(null, user);
                })
            }
        })
    }
))