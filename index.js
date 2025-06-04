const session = require('express-session');
const express = require('express');
const app = express();

app.use(session({
  secret: 'your-secret-key',      
  resave: false,                    
  saveUninitialized: true,          
  cookie: { maxAge: 60000 }         
}));

app.get('/', (req, res) => {
  if (req.session.views) {
    req.session.views++
    res.send(`Views: ${req.session.views}`);
  } else {
    req.session.views = 1;
    res.send('Welcome to the session demo!');
  }
});

app.get("/register",(req,res)=>{
    let {name="anonymous"} =req.query;
    req.session.name=name;
    res.redirect("/hello")
})

app.get("/hello",(req,res)=>{
    res.send(`hello, ${req.session.name}`)
})
app.listen(3000,()=>{
    console.log("Server is running")
})