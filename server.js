const express = require('express')
const app = express();
const request = require('request')
const bodyParser = require('body-parser')
const authRoutes = require('./routes/auth-routes')
const passportSetup = require('./config/passport-setup')
const mongoose = require('mongoose')
const keys = require('./config/keys')
const SERVER_PORT = process.env.PORT || 3000

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended : true}));
app.set('view engine' , 'hbs')
mongoose.connect(keys.mongodb.dbURI , () => {
    console.log('sucessfully connected to mongodb at mlab!!')
},{useNewUrlParser: true})

app.use('/auth' , authRoutes)
app.get('/' , (req,res) => {
  res.render('index' , {answer:null})
}) 

app.post('/' , (req,res) => {
 let script = req.body.code;
 let language = req.body.language;

 let clientId = 'a81bbf6be91a5189126fdd4513db6a2e';
 let clientSecret = 'a8cd1898d259f552bb4fd57ad7a66e17bc689e53801472004e548c4fcf455823';
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
      res.render('index' , {answer:answer})
 })
 
})


app.listen(SERVER_PORT , () => {
    console.log('server started at port:' + 'http://localhost:3000')
})