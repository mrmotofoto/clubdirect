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

mongoose.connect('mongodb://localhost/club_direct');

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));

seedDB();

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

//ROUTES------------------------------------------------
app.get('/', function(req, res) {
   res.redirect('/clubs'); 
});


app.get('/clubs', function(req, res) {
    Club.find({}, function(err, data) {
       if(err) {
           console.log(err);
       } else {
            res.render('clubs/index', {clubs: data});
       }
    });
});


app.post('/clubs', function(req, res) {
//DEFAULT ENTRIES IF FORM FIELDS LEFT BLANK--------------------------------------
    var noEntry = "No Entry";
    var defaultImg = "https://farm1.staticflickr.com/63/187187176_73d89267be.jpg";
    var defaultAdd = "XXX E ZZZZ YYY CCC, Fort Lauderdale, FL 11111";
      
    var name = req.body.name ? req.body.name : noEntry ,
        address = req.body.address ? req.body.address : noEntry,
        hrcontact = req.body.hrcontact ? req.body.hrcontact : noEntry,
        hrphone = req.body.hrphone ? req.body.hrphone : noEntry,
        hremail = req.body.hremail ? req.body.hremail : noEntry,
        gmcontact = req.body.gmcontact ? req.body.gmcontact : noEntry,
        gmphone = req.body.gmphone ? req.body.gmphone : noEntry,
        gmemail = req.body.gmemail ? req.body.gmemail : noEntry,
        distance = req.body.distance ? req.body.distance : noEntry,
        notes = req.body.notes ? req.body.notes : noEntry,
        image = req.body.image ? req.body.image : defaultImg;
        
    var newClub = {
        name:name,
        address: address,
        hrcontact:hrcontact,
        hremail:hremail,
        hrphone:hrphone,
        gmcontact:gmcontact,
        gmemail:gmemail,
        gmphone:gmphone,
        distance:distance,
        notes:notes,
        image:image
    }
    
    Club.create(newClub, function(err, data) {
      if(err) {
          console.log(err);
      }  else {
          res.redirect('/clubs');
         }
    }); 
}); //app.post END--------------------------------------------------------------

app.get('/clubs/new', function(req, res) {
    res.render('clubs/new');
});


app.get('/clubs/:id', function(req, res) {
    Club.findById(req.params.id).populate('comments').exec(function(err, data) {
        if(err) {
            console.log(err);
        } else {
            console.log(data);
            res.render("clubs/show", {club: data});
        }
    });
});


app.get('/clubs/:id/comments/new', function(req, res) {
    Club.findById(req.params.id, function(err, club) {
        if(err) {
            console.log(err);
        } else {
            res.render("comments/new", {club: club});
        }
    })
});

app.post('/clubs/:id/comments', function(req, res) {
Club.findById(req.params.id, function(err, club) {
    if(err) {
        console.log(err);
        res.redirect('/clubs');
    } else {
        Comment.create(req.body.comment, function(err, comment) {
            if(err) {
                console.log(err);
            } else {
                club.comments.push(comment);
                club.save();
                res.redirect('/clubs/' + club._id);
            }
        })
    }
});    
});

//AUTH ROUTES-------------------------------------------------
app.get('/register', function(req, res) {
   res.render('register'); 
});

app.post('/register', function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user) {
        if(err) {
            console.log(err);
            return res.render('register');
        } 
           passport.authenticate('local')(req, res, function() {
           res.redirect('/clubs'); 
        });
    });
});

//SHOW LOGIN FORM-------
app.get('/login', function(req, res) {
   res.render('login'); 
});

//LOGIN LOGIC ----------
app.post('/login', passport.authenticate('local', 
    {
        successRedirect: "/clubs",
        failureRedirect: "/login"
    }), function(req, res) {
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log('Server Is Running'); 
});

