//importing packages
var express =    require("express"),
    logger  =    require("morgan"),
    bodyParser=  require("body-parser");

//creating instance of express app
var app=express();

//seting things up
app.use(logger('dev'));
app.set('view engine','ejs');
    //to include static files everytime the page loads
app.use(express.static('views'));
app.set('views',__dirname+'/views');
    //to get posted data in json format
    
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}));



//ROUTES
app.get("/",function(req,res){
    res.render("home");
})

app.post("/",function(req,res){
   
});

app.get("/login",function(req,res){
    res.render("login");
})

//LISTENER PORT
app.listen(3000,function(){
    console.log("Server started");
});