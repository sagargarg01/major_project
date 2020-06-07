const passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
const crypto = require('crypto');
const User = require('../models/user');


passport.use(new GitHubStrategy({
   clientID: "8d43b304a437d6ce9e77",
   clientSecret: "779efed5281d33aa62678318468205c84fbb1416",
   callbackURL: "http://localhost:8000/users/auth/github/callback"
 },
 function(accessToken, refreshToken, profile, cb) {
   User.findOne({email: profile.emails[0].value}).exec(function(err, user){
      if(err){console.log("Error in github strategy passport", err); return;}
      
      // console.log(profile);

       //if found, set the user as req.user
      if(user){
          return cb(null, user);
         
      }else{
           // if not found, create the user and set it as req.user
         //  console.log('***** new user lets create ')
          User.create({
              name: profile.name,
              email: profile.emails[0].value,
              password: crypto.randomBytes(20).toString('hex')
          }, function(err, user){
              if(err){console.log("Error in creating user github strategy passport", err); return;}

              return cb(null, user);
          })
      }
  })
 }
));