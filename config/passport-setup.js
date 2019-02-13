const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const GithubStrategy = require('passport-github')
const keys = require('./keys')
const User = require('../models/user-model')

passport.serializeUser((user,done) => {
    done(null,user.id)

})

passport.deserializeUser((id,done) => {
    User.findById(id).then((user) => {
        done(null,user)
    })
})

passport.use(
    new GoogleStrategy({
          callbackURL:'/auth/google/redirect',
          clientID:keys.google.clientID,
          clientSecret:keys.google.clientSecret
} , (acessToken,refreshToken,profile,done) => {
           User.findOne({googleId:profile.id}).then((currentUser) => {
                      if(currentUser) {
                             console.log('current user is: ' + currentUser)
                             done(null,currentUser)
                      }else {
                        new User({
                            username:profile.displayName,
                            googleId:profile.id,
                            thumbnail:profile._json.image.url
                        }).save().then((newUser) => {console.log('new user is created:'+ newUser)
                          done(null,newUser)
                    })
                      }
           })
          
})
)


passport.use(
    new GithubStrategy({
          callbackURL:'/auth/github/redirect',
          clientID:keys.github.clientID,
          clientSecret:keys.github.clientSecret
} , (acessToken,refreshToken,profile,done) => {
  
     console.log(profile.log)
     console.log(profile.id)
     
           User.findOne({githubId:profile.id}).then((currentUser) => {
                      if(currentUser) {
                             console.log('current user is: ' + currentUser)
                            
                             done(null,currentUser)
                      }else {
                        new User({
                            username:profile.name,
                            githubId:profile.id,
                            avtar:profile._json.avatar_url
                        
                        }).save().then((newUser) => {
                            console.log('new user is created:'+ newUser)
                           
                          done(null,newUser)
                    })
                      }
           })
          
})
)