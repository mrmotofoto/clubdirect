var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Club = require('./models/club');
var Comment = require('./models/comment');
var User = require('./models/user');
var seedDB = require('./seeds');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var methodOverride = require('method-override');

//REQUIRING Routes--------------------------------------------
var commentRoutes = require('./routes/comments');
var clubRoutes = require('./routes/clubs');
var indexRoutes = require('./routes/index');

mongoose.connect('mongodb://localhost/club_direct');

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));



//seedDB();

//PASSPORT CONFIG----------------------------------------------
app.use(require('express-session')({
    secret: "Once again harry wins the cutest dog in the world award",
    resave:false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(indexRoutes);
app.use("/clubs/:id/comments",commentRoutes);
app.use("/clubs", clubRoutes);
//ROUTES------------------------------------------------










//AUTH ROUTES-------------------------------------------------




app.listen(process.env.PORT, process.env.IP, function(){
   console.log('Server Is Running'); 
});

