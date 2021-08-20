const express = require('express');
const upload = require('express-fileupload');
const path = require('path');
const app = express();
var http = require('http');
var url = require('url');


//app.use(upload());

app.get('/', (req,res) =>{
var query = require('url').parse(req.url,true).query;
var uname = query.uname;   
res.sendFile(__dirname  + '/login.html');


app.post('upload/', (req,res)=>{

if(req.files){
    
var file = req.files.file;
var filename = file.name;
console.log(filename);

file.mv('./Upload/' + filename , function(err){
if(err){
res.send(err)
}else{
res.send("File Uploaded");
}
})
}
})

var obj = {};
 
app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs');
app.get('/Admin', function(req, res){
 
result = {"Name": "Admin", "image":   "http://localhost:5000/img/Admin.png" };
obj = {welcome: result};
res.render('welcome', obj);   
});


app.get('/Faculty', function(req, res){
 
result = {"Name": "Faculty", "image":   "http://localhost:5000/img/Faculty.png" };
obj = {welcome: result};
res.render('welcome', obj);   
});

app.get('/Student', function(req, res){
result ='Student';
result = {"Name": "Student", "image":   "http://localhost:5000/img/student.png" };
obj = {welcome: result};
res.render('welcome', obj);   
});
  
app.get('/Coordinator', function(req, res){
result = {"Name": "Co ordinator", "image":   "http://localhost:5000/img/co.png" };
obj = {welcome: result};
res.render('welcome', obj);   
});

app.get('/forgot', function(req, res){
res.sendfile("./forgot.html");
 
});
  
if(uname!=null){
res.redirect('/otp');
}

app.get('/otp', function(req, res){
res.sendfile("./otp.html");
var spawn = require("child_process").spawn; 
var process = spawn('python',["./otp.py",] ); 
console.log("Generating Otp " + process);
});



})


app.listen(8000);
console.log("Listening to port 8000");