//importing packages
var express = require("express"),
    logger = require("morgan"),
    bodyParser = require("body-parser"),
    admin = require("firebase-admin"),

    serviceAccount = require('./rescuing-the-rescued-firebase-adminsdk-9t73e-dcf8a33610.json');
const port = process.env.PORT|| 3000;
var firebaseAdmin = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://rescuing-the-rescued.firebaseio.com'
})

var db = firebaseAdmin.firestore();
//creating instance of express app
var app = express();



//seting things up
app.set('view engine', 'ejs');
//to include static files everytime the page loads
app.use(express.static('views'));
app.set('views', __dirname + '/views');
//to get posted data in json format
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

app.use(logger('dev'));


//==============RESTFULL ROUTES===========
app.get("/", function (req, res) {
    res.render("home");
});

app.get("/child", function (req, res) {
    res.render("indexx");
});

app.get("/donate", function (req, res) {
    res.render("donate");
});
app.get("/new", function (req, res) {
    res.render("new");

});

app.get('/children/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!id) throw new Error('id is blank');
        const note = await db.collection('children').doc(id).get();
        if (!note.exists) {
            throw new Error('note does not exists');
        }
        //var pass=JSON.stringify(note._fieldsProto);
        //console.log(pass);

        var pass = JSON.stringify(note);
        var name = note._fieldsProto.name.stringValue;
        console.log(name)
        var age = note._fieldsProto.age.stringValue;
        var dob = note._fieldsProto.dob.stringValue;
        var city = note._fieldsProto.city.stringValue;
        var desc = note._fieldsProto.description.stringValue;
        var url = note._fieldsProto.image.stringValue;
        res.render("children/show", { name: name, age: age, dob: dob, city: city, desc: desc, url: url });
    } catch (e) {
        next(e);
    }

    //     serverRef = db.collection('children');
    // getDocs = serverRef.get()
    // .then(querySnapshot => {
    //     if (querySnapshot.empty) {
    //         res.send("NO SERVERS AVAILABLE");
    //     } else {
    //         var docs = querySnapshot.docs.map(doc => doc.data());
    //         console.log('Document data:', docs);
    //         res.end(JSON.stringify({kind: 'chal ja mere', servers: docs}));
    //     }
});



///==========AUTH ROUTES============
app.get("/login", function (req, res) {
    console.log("logging in");
    res.render("login");
})
//MIDDLEWARE AUTHENTICATION FUNCTION
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

//LISTENER PORT
app.listen(port, () => {
    console.log("Server started on port" + port);
});