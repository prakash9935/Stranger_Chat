const express = require('express');
var app=express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const PORT=process.env.PORT ||3000
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'))
app.set('view engine','ejs');
app.get("/",function(req,res){
res.render(__dirname+ '/login');
});
app.post("/",function (req,res) {
  var username=String(req.body.fname);
  res.render(__dirname+"/index",{
    username:username
  });
});
http.listen(process.env.PORT || 3000,function (){
  console.log("Listening on port 3000");
});

io.on('connection',function(socket){
  console.log("User Connected");

  socket.on("chatText",function(msg) {
    io.emit("chatText",msg);
  });

  socket.on("disconnect",function () {
    console.log("User disconnected");
  })
})
