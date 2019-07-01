//importing packages
var express         =require("express"),
    logger          =require("morgan"),
    bodyParser      =require("body-parser"),
    admin           =require("firebase-admin"),
    
    serviceAccount  =require('./rescuing-the-rescued-firebase-adminsdk-9t73e-dcf8a33610.json');

var firebaseAdmin=admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL:'https://rescuing-the-rescued.firebaseio.com'
})

//creating instance of express app
var app = express();



//seting things up
app.set('view engine', 'ejs');
//to include static files everytime the page loads
app.use(express.static('views'));
app.set('views',__dirname+'/views');
//to get posted data in json format
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

app.use(logger('dev'));


//==============RESTFULL ROUTES===========
app.get("/", function (req, res) {
    res.render("home");
})

app.get("/children", function (req, res) {
    res.render("children");
});

app.get("/donate", function (req, res) {
    res.render("donate");
});

app.get("/show", function (req, res) {
    res.render("show");
});


///==========AUTH ROUTES============
app.get("/login", function (req, res) {
    console.log("logging in");
    res.render("login");
})
//MIDDLEWARE AUTHENTICATION FUNCTION
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

//LISTENER PORT
app.listen(3000, function () {
    console.log("Server started");
});