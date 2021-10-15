const express = require("express");
const bodyParser = require("body-parser");
// const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./config")
const date = require(__dirname + "/date.js");


name = config.name;
pass = config.pass;
var url = "mongodb+srv://" + name + ":" + pass + "@email-editor.kre0j.mongodb.net/to-do-list";
mongoose.connect(url)

var schema = new mongoose.Schema({
  loc : String,
  task : String
});

var Task = mongoose.model('Task',schema);



const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/Public"))


app.set('view engine','ejs');

let t = ['Buy Food','Cook Food','Eat Food'];
let workItems = [];

app.get("/",async function(req,res){

  let today = date.getDate();
  const arr = await Task.find({loc:"Home"},{task:1,_id:0});
  let task = []

  for(let i=0;i<arr.length;i++){
      task.push(arr[i].task);
  };
  res.render('index', {listTitle:today,item:task});

});



app.post("/",function(req,res){
  let new_t = req.body.nt;
  if(req.body.ls==="Work"){
    workItems.push(new_t);
    let obj = new Task({
      loc:"Work",
      task:new_t
    });

    obj.save();
    res.redirect("/work");
  }
  else{
  t.push(new_t);
  let obj = new Task({
    loc:"Home",
    task:new_t
  });

  obj.save();
  res.redirect("/");
  }

})

app.post("/del",async function(req,res){
  const val = req.body.checkbox;
  let del = await Task.deleteOne({task:val});
  res.redirect(req.headers.origin)
})

app.get("/work",async function(req,res){
  const arr = await Task.find({loc:"Work"},{task:1,_id:0});
  let task = []

  for(let i=0;i<arr.length;i++){
      task.push(arr[i].task);
  };
  res.render("index", {listTitle:"Work List",item:task});
})

app.get("/about",function(req,res){
  res.render("about");
})

app.listen(process.env.PORT || 3000,function(){
  console.log("Server started.");
})
