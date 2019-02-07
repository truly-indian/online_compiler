const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const keys = require('./keys')
const User = require('../models/user-model')
passport.use(
    new GoogleStrategy({
          callbackURL:'/auth/google/redirect',
          clientID:keys.google.clientID,
          clientSecret:keys.google.clientSecret
} , (acessToken,refreshToken,profile,done) => {
           console.log(profile)
           new User({
               username:profile.displayName,
               googleId:profile.id,

           }).save().then((newUser) => {console.log('new user is created:'+ newUser)})
})
)