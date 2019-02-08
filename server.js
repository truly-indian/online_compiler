const express = require('express')
const app = express();
const request = require('request')
const bodyParser = require('body-parser')
const authRoutes = require('./routes/auth-routes')
const profileRoutes = require('./routes/profile-routes')
const passportSetup = require('./config/passport-setup')
const mongoose = require('mongoose')
const keys = require('./config/keys')
const cookieSession = require('cookie-session')
const passport = require('passport')

const SERVER_PORT = process.env.PORT || 3000

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended : true}));

app.set('view engine' , 'hbs')

app.use(cookieSession({
    maxAge: 24 * 60 *60 *1000 ,
    keys: [keys.session.cookieKey]
}))

app.use(passport.initialize())
app.use(passport.session())

mongoose.connect(keys.mongodb.dbURI , () => {
    console.log('sucessfully connected to mongodb at mlab!!')
},{useNewUrlParser: true})

app.use('/auth' , authRoutes)
app.use('/profile' , profileRoutes)
app.get('/' , (req,res) => {
  res.render('index' , {answer:null, user:req.user})
}) 

app.post('/' , (req,res) => {
 let script = req.body.code;
 let language = req.body.language;

 let clientId = keys.jsdoodle.clientId;
 let clientSecret = keys.jsdoodle.clientSecret;
 let stdin = req.body.custom_input;
 const program = {
     script : script,
     language : language,
     clientId : clientId,
     clientSecret : clientSecret,
     stdin  : stdin
 }
 request({
     url: 'https://api.jdoodle.com/v1/execute',
     method: 'POST',
     json: program
 }, (error, response ,body) => {
      console.log(body)
      let answer = {
          output: body.output,
          memory: body.memory,
          time:   body.cpuTime
      }
      res.render('index' , {answer:answer,code:program.script})
 })
 
})


app.listen(SERVER_PORT , () => {
    console.log('server started at port:' + 'http://localhost:3000')
})