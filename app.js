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

//miidleware logging function
function isAuthenticated(req,res,next){
    
}

//ROUTES
app.get("/", function (req, res) {
    res.render("home");
})

app.get("/children", function (req, res) {
    res.render("show");
});

app.get("/login",isAuthenticated,function (req, res) {
    res.render("login");
})

//LISTENER PORT
app.listen(3000, function () {
    console.log("Server started");
});