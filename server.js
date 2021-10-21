const express = require('express');
const upload = require('express-fileupload');
const path = require('path');
const app = express();
var http = require('http');
var url = require('url');
var mysql = require('mysql');
const fs = require('fs'); 
var ejs = require('ejs');
var bodyParser = require('body-parser');

//app.use(upload());
 

 



//mysql connection
var uname=null;
var mycon = mysql.createConnection({
connectionLimit: 10,
acquireTimeout: 30000, //30 secs
host: "localhost",
user: "root",
password: "Awez@0987", // sensitive
multipleStatements: true ,
port: "3306",
database: "database1"
});
         
var c=0;
 


app.get('/', (req,res) =>{
var query = require('url').parse(req.url,true).query;
uname = query.uname;
//truncating temporary values
//truncating temporary files


if(c==0){
res.sendFile(__dirname  + '/home.html');
fs.truncate('block.txt', 0, function() {});
fs.truncate('logintype.txt', 0, function() {});   
fs.truncate('out.txt', 0, function() {});
    
c+=1;
}
     




 
        



    








var obj = {};
 
app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs');
app.get('/Admin', function(req, res){
fs.writeFile('logintype.txt', 'adminlogin' , (err) => { }) 
result = {"Name": "Admin", "image":   "http://localhost:5000/img/Admin.png" };
/*obj = {welcome: result};
res.render('welcome', obj);  */
res.sendfile ("./admin.html");
});


app.get('/Faculty', function(req, res){
fs.writeFile('logintype.txt', 'facultylogin' , (err) => { }) 
result = {"Name": "Faculty", "image":   "http://localhost:5000/img/Faculty.png" };
obj = {welcome: result};
res.render('welcome', obj);   
});

app.get('/Student', function(req, res){
fs.writeFile('logintype.txt', 'studentlogin' , (err) => { }) 
result ='Student';
result = {"Name": "Student", "image":   "http://localhost:5000/img/student.png" };
obj = {welcome: result};
res.render('welcome', obj);   
return ;
});
  
app.get('/Coordinator', function(req, res){
fs.writeFile('logintype.txt', 'coordlogin' , (err) => { }) 
result = {"Name": "Co ordinator", "image":   "http://localhost:5000/img/co.png" };
obj = {welcome: result};
res.render('welcome', obj);   
});

app.get('/forgot', function(req, res){
res.sendfile("./forgot.html");

 
});

app.get('/home', function(req, res){
res.sendfile("./home.html");
});
 


if(uname!=null){
res.redirect('/otp');
}

app.get('/otp', function(req, res){
fs.writeFile('currentlogin.txt', uname , (err) => {  });
res.sendfile("./otp.html");
var spawn = require("child_process").spawn; 
var process = spawn('python',["./otp.py",] ); 
console.log("Generating Otp " + process);
});



//forgot password

var ack=null;
 
//forgot password otp
  
var uname1=query.uname1;
var pwd=query.pwd;
var cpwd=query.cpwd;
var otp_user=query.otp;




if(otp_user!=null){
mycon.query('SELECT * from otp', function (error,otp, fields) {
if (error) throw error;
var length = otp.length;
var p=null;

for(var i = 0; i < length; i++){
if (otp[i].user==uname1){

p=i;

if(otp[p].otp==otp_user){

if(pwd==cpwd){
forgotpass();
}else{
res.send("password and confirm password are not same");
}

}else{
res.send("please provide the correct otp");
}
}
}
})
console.log("user " + uname1 + "  otp user got = " + otp_user + " acknowledge " + ack )
 
 
 
    



function forgotpass() {
fs.readFile('logintype.txt', 'utf-8', (err, data) => {
const sql3=`UPDATE ${data} SET pwd = '${pwd}' WHERE (uname ='${uname1}')`;
mycon.query(sql3, function (err, result) {
if (err) throw err;
console.log(result);
});
});
res.sendfile("usuccess.html");
 
}
}


var issue = query.issue;
var section=query.section;
var subcode=query.subcode;
var grade=query.grade;
var mark=query.mark;


app.get('/classissues', function(req, res){
res.sendfile("./classissues.html");
        
});
        
if(issue!=null && section!=null){  
mycon.query(` INSERT INTO database1.classissues (section, issue) VALUES ('${section}', '${issue}');`, function(err, result) {
if(err){ throw err; }
res.sendfile("./usuccess.html");
})
}

//Grading Marks Edited by Coordinator
if(subcode!=null && grade!=null && mark!=null){  
mycon.query(` UPDATE database1.gradingscheme SET ${grade} = '${mark}' WHERE (coursecode = '${subcode}');`, function(err, result) {

if(err){ throw err;}
res.sendfile("./usuccess.html");
})
}















//login
 
var query = require('url').parse(req.url,true).query;
 //Admin Logging in


var ad_uname=query.admin_uname;
var ad_pass=query.admin_password;

if(ad_uname != undefined && ad_pass != undefined){
if(ad_uname=="admin" && ad_pass =="1234"){
res.sendfile("welcome_admin.html");
}
}

app.get('/welcome_admin', function(req, res){
res.sendfile("./welcome_admin.html");
});



app.get('/currentlogin',function(req,res){
fs.readFile('currentlogin.txt', 'utf-8', (err, data) => { 
var datac=data.split(",");
        
if (err) throw err;         
mycon.query(`  select username,rollno, mobile, cgpa, images, mail from profile WHERE (rollno ='${data}')`, function(err, result) {
if(err){
throw err;
} else {
obj1 = {activelogins: result};
res.render('activelogins', obj1);   
//console.log(obj1);      
}
});
})
});

app.get('/loginhistory',function(req,res){
      
mycon.query(`SELECT  user , date, time  , images from loginhistory , profile  where (profile.rollno=user )`, function(err, result) {
if(err){
throw err;
} else {
obj1 = {loginhistory: result};
res.render('loginhistory', obj1);   
//console.log(obj1);      
}
});         
});

 

var username = query.username;
var password=query.password;
 
 
if(username != undefined && password != undefined) {
fs.truncate('currentlogin.txt', 0, function() {
console.log("File Content Deleted");
});
    
fs.readFile('block.txt', 'utf-8', (err, data) => { 
if (err) throw err;
    
if(username==data){
res.send("Your account is blocked ..pls login after 24hrs");
}else{
    
var test = 0;             
var pd=password;
fs.readFile('logintype.txt', 'utf-8', (err, data) => {
var sqlquery='SELECT * from ';
sqlquery +=data;

mycon.query(sqlquery, function (error,login, fields) {
if (error) throw error;
    
var length = login.length;
var m=null;
for(var i = 0; i < length; i++){
if (login[i].uname==username){
m=i;
}
}
if(m==null){
res.sendfile("oops.html");
}else{ 
            
if(login[m].pwd==password){
test=1
    
fs.appendFile('currentlogin.txt', username , (err) => { 
if (err) throw err;
const sql5=`INSERT INTO database1.currentlogin (user) VALUES ('${username}')`;
mycon.query(sql5, function (err1, result) {
if (err1) throw err1;
console.log(result);
});
}) 
}}
    
console.log(username);
console.log(password);
console.log(test);
if(test==1){ 
 
res.redirect("/loginwelcome");
 
 
 
fs.readFile('currentlogin.txt', 'utf-8', (err, data1) => { 
if (err) throw err;
var currentTime = new Date();
var da=currentTime.getDate() + ":" + currentTime.getMonth() + ":" + currentTime.getFullYear() ;
var currentOffset = currentTime.getTimezoneOffset();
var ISTOffset = 330;   // IST offset UTC +5:30 
var ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset)*60000);
var time = ISTTime.getHours() + ":" + ISTTime.getMinutes() + ":" + ISTTime.getSeconds();
console.log(" Date   " + currentTime + " Time : " + time);
const sql5=`INSERT INTO database1.loginhistory (user, date, time ) VALUES ('${username}' , '${currentTime}' , '${time}')`;
mycon.query(sql5, function (err2, result) {
if (err2) throw err2;
console.log(result);
});
             
})
            
    
    
}
if(test==0 && m!=null){
wrongpass();
}
});
})
     
}})
}
 
    
    
    
function wrongpass(){
count=0;
let data = username+",";
fs.appendFile('out.txt', data, (err) => { 
if (err) throw err; 
}) 
var count=0;
try {  
var data1 = fs.readFileSync('out.txt', 'utf8');
console.log(data.toString());    
} catch(e) {
console.log('Error:', e.stack);
}
console.log("data" ,data1);
let inp=data1.split(",");
    
for(var w=0;w<=inp.length-1;w++){
if(inp[w]==username){
count++;
}
}
if(count==0){
res.send("Please provide valid details \n left 2 attempts");
}else if(count==1){
res.send("Please provide valid details \n left 1 attempt");
}else if(count>1){
res.send("Your account is blocked ..pls login after 24hrs");
fs.appendFile('block.txt', username, (err) => {
console.log("succesfully blocked"); 
if (err) throw err; 
}) 
console.log("user " + username + "blocked");
}
        
     
}





app.get('/loginwelcome', function(req2, res2){
fs.readFile('logintype.txt', 'utf-8', (err, data1) => {
fs.readFile('currentlogin.txt', 'utf-8', (err, data) => { 
if (err) throw err; 
 
mycon.query(`SELECT name FROM ${data1}  WHERE (uname ='${data}')`, function(err, result) {
            
if(err){
throw err;
} else {
obj = {loginwelcome: result};

res2.render('loginwelcome', obj);           
}
});
});
});

app.get('/data' , function(req,res){
fs.readFile('logintype.txt', 'utf-8', (err, data1) => {
fs.readFile('currentlogin.txt', 'utf-8', (err, data) => { 
if (err) throw err; 
var obj={}
mycon.query( `SELECT * FROM  profile where  ( profile.rollno=  '${data}' );` , function(err, result) {

if(err){
throw err;
} else {
obj = {students: result};
if(data1=="facultylogin"){
res.render('faculty', obj);
}
else if(data1=="coordlogin"){ 
res.render('coord', obj);    
}  
else if(data1=="studentlogin"){ 
res.render('students', obj);    
}       
}
});
});
})
})


//Retriving Students Details


var obj1 = {};
app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs');
app.get('/students', function(req, res) { 
fs.readFile('currentlogin.txt', 'utf-8', (err, data) => { 
if (err) throw err;         
mycon.query(`  SELECT * FROM database1.profile where type="student"; `, function(err, result) {
        if(err){
        throw err;
        } else {
        obj1 = {students_details: result};
        res.render('students_details', obj1);   
       // console.log(obj1);      
        }
        });
});
}); 

//Retriving Faculty Details

 
app.get('/faculty_details', function(req, res) {      
var obj2={}  
mycon.query(` SELECT * FROM database1.profile where type="faculty"; `, function(err, result) {
if(err){
throw err;
} else {
obj2 = {faculty_details: result};
res.render('faculty_details', obj2);   
}});
 
}); 

//Retriving Co ordinator details
app.get('/coord_details', function(req, res) {      
var obj2={}  
mycon.query(` SELECT * FROM database1.profile where type="coord"; `, function(err, result) {
if(err){
throw err;
} else {
obj2 = {faculty_details: result};
res.render('faculty_details', obj2);   
}});         
}); 


 
app.get('/class_issues', function(req, res) {      
var obj2={}  
mycon.query(` SELECT * FROM database1.classissues; `, function(err, result) {
if(err){
throw err;
} else {
obj2 = {class_issues: result};
res.render('class_issues', obj2);   
}});         
}); 

app.get('/tracking', function(req, res) {      
var obj2={}  
mycon.query(` SELECT * FROM database1.tracking; `, function(err, result) {
if(err){        throw err;
} else {
obj2 = {tracking: result};
res.render('tracking', obj2);   
}});         
}); 
        


app.get('/attendance' , function(req,res){
mycon.query( `SELECT * FROM database1.attendance; ` , function(err, result) {
if(err){
throw err;
} else {
obj = {attendance : result};
                    
res.render('attendance', obj);           
}
});
         
})

 
app.get('/marks', function(req, res) {      
var obj2={}  
mycon.query(` SELECT * FROM database1.marks; `, function(err, result) {
if(err){
throw err;
} else {
obj2 = {marks: result};
res.render('marks', obj2);
}});
}); 

app.get('/selfmarks', function(req, res) {      
var obj2={}  
fs.readFile('currentlogin.txt', 'utf-8', (err, data) => { 
if (err) throw err;  
mycon.query(` SELECT * FROM database1.marks where rollno =  '${data}'; `, function(err, result) {
if(err){
throw err;
} else {
obj2 = {marks: result};
res.render('marks', obj2);
}});
});
}); 






app.get('/grading' , function(req,res){
mycon.query( `SELECT * FROM database1.gradingscheme; ` , function(err, result) {
if(err){
throw err;
} else {
obj = {grading : result};
            
res.render('grading', obj);           
}
});
 
})

app.get('/uploading' , function(req,res){
var spawn = require("child_process").spawn; 
var process = spawn('node',["./upload.js",] ); 
console.log("upload js file started  " + process);
        
        

fs.readFile('logintype.txt', 'utf-8', (err, data1) => {
fs.readFile('currentlogin.txt', 'utf-8', (err, data) => { 
if (err) throw err; 
mycon.query( `SELECT * FROM  profile where  ( profile.rollno = '${data}') ` , function(err, result) {
        
if(err){
throw err;
} else {
obj = {upload: result};
                
res.render('upload', obj);           
}
});
});
})
     
})


app.get('/gradeedit', function(req, res){
fs.readFile('logintype.txt', 'utf-8', (err, data1) => {       

if(data1=="coordlogin"){
res.sendfile("./gradeedit.html");
}else{
res.sendfile("./restrict.html");
}


})
});
 
 
});

app.get('/warning', function(req, res){
res.sendfile("./warning.html");
});

app.get('/logout', function(req, res){
res.sendfile("logout.html");
fs.readFile('currentlogin.txt', 'utf-8', (err, data) => { 
if (err) throw err; 
mycon.query(  `truncate table database1.currentlogin `,function(err,result){
if(err) throw err;
// console.log(result);
});
fs.truncate('currentlogin.txt', 0, function() {
console.log("File Content Deleted");
});
});
});

})



     
     









app.listen(8000);
console.log("Listening to port 8000");