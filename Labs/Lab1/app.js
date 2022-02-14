const express = require('express');
const configRoutes = require('./routes');
const session = require('express-session');
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        name: 'AuthCookie',
        secret: 'some secret string!',
        resave: false,
        saveUninitialized: true
}));

//logging middleware fn
const myLogger = function(req,res,next){
  console.log('Current Timestamp:', new Date().toUTCString());
  console.log('Request Method:', req.method);
  console.log('Request Route:', req.originalUrl);
  console.log(`${req.session.username ? req.session.username : "User"} is ${req.session.username ? "" : " not"} authenticated`)
  next();
}
app.use(myLogger);

//something new
const checkMiddleware = function(req, res, next){
    if(req.method === "POST" && req.path === "/") {
        if(!req.session.username) {
            res.status(403).json({e:"First Login to post the blog"});
        }else{
            next();
      }
    }else if(req.method === "PUT") {
        if(!req.session.username) {
            res.status(403).json({e:"First Login to replace the blog!"});
        }else{
            next();
        }
    }else if(req.method === "PATCH") {
      if(!req.session.username) {
          res.status(403).json({e:"First Login to modify the blog!"});
      }else{
          next();
      }
    }else{
        next();
    }
}
app.use('/blog/', checkMiddleware);

app.use('/blog/:blogId/comments', (req,res,next) =>{
    if(req.method === "POST"){
      if(!req.session.username){
        res.status(403).json({e: "login first to comment on the blog"});
      }
      else{
        next();
      }
    }else{
      next();
    }
});

app.use('/blog/:blogId/:commentId', (req,res,next) =>{
    if(req.method === "DELETE"){
      if(!req.session.username){
        res.status(403).json({e: "login first with correct id to delete the comment"})
      }
      else{
        next();
      }
    }
    else{
      next();
    }
});

//Middleware login, signup and logout
app.use('/blog/login',(req,res,next)=>{
    if(req.session.username){
        res.status(403).json({e:`${req.session.username} Logged-In Already, logout to login a new user`});
    }
    else{
        next();
    }
});

app.use('/blog/signup',(req,res,next)=>{
  if(req.session.username){
      res.status(403).json({e:"User logged in Already"})
  }
  else{
      next();
  }
});

app.use('/blog/logout',(req,res,next)=>{
    if(!req.session.username){
        res.status(403).json({e:"No User logged in"})
    }
    else{
        next();
    }
});

configRoutes(app);

const Port = 3000
app.listen(Port, () => {
    console.log("We've now got a server!");
    console.log(`Your routes will be running on http://localhost:${Port}`);
});
