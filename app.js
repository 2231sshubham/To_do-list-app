const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/Public"))


app.set('view engine','ejs');

let t = ['Buy Food','Cook Food','Eat Food'];
let workItems = [];

app.get("/",function(req,res){

  let today = date.getDate();
  res.render('index', {listTitle:today,item:t});

})


app.post("/",function(req,res){
  let new_t = req.body.nt;
  if(req.body.ls==="Work"){
    workItems.push(new_t);
    res.redirect("/work");
  }
  else{
  t.push(new_t);
  res.redirect("/");
  }

})


app.get("/work",function(req,res){
  res.render("index", {listTitle:"Work List",item:workItems});
})

app.get("/about",function(req,res){
  res.render("about");
})

app.listen(3000,function(){
  console.log("Server started.");
})
