var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/club_direct');

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));


//SCHEMA SETUP----------------------------------------------------
var clubSchema = new mongoose.Schema({
    name: String,
    address: String,
    hrcontact: String,
    hrphone: String,
    hremail: String,
    gmcontact: String,
    gmphone: String,
    gmemail: String,
    distance: String,
    notes: String,
    image: String  
});

var Club = mongoose.model("Club", clubSchema);

// Club.create({
//     name: "Fort Lauderdale Country Club",
//     address: "415 E Country Club Cir, Fort Lauderdale, FL 33317",
//     hrcontact: "Harry Smith",
//     hrphone: "347-666-1234",
//     hremail: "default@gmail.com",
//     gmcontact: "Anthony Mandatta",
//     gmphone: "347-452-9552",
//     gmemail: "gmmanaer@club.com",
//     distance: "12.7 miles",
//     notes: "This could be General Notes Section Some more Notes",
//     image: "https://farm3.staticflickr.com/2217/1711688729_10fd998b5d.jpg" 
// }, function(err, club) {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log("New Club Created");
//         console.log(club);
//     }
// });

//ROUTES------------------------------------------------
app.get('/', function(req, res) {
   res.render('landing'); 
});



app.get('/clubs', function(req, res) {
    Club.find({}, function(err, data) {
       if(err) {
           console.log(err);
       } else {
            res.render('clubs', {clubs: data});
       }
    });
});

app.post('/clubs', function(req, res) {
var noEntry = "No Entry";
var defaultImg = "https://farm1.staticflickr.com/63/187187176_73d89267be.jpg";
var defaultAdd = "XXX E ZZZZ YYY CCC, Fort Lauderdale, FL 11111"
  
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
    
});

app.get('/clubs/new', function(req, res) {
    res.render('new');
});

app.get('/show', function(req, res) {
   //res.render('show', {clubs: clubs}); 
});




app.listen(process.env.PORT, process.env.IP, function(){
   console.log('Server Is Running'); 
});





//   var clubs = [
//         {
//         name: "Coral Ridge Country Club",
//         address: "3801 Bayview Dr., Fort Lauderdale, FL 33308",
//         hrcontact: "John Smith",
//         hrphone: "(954) 449-0399",
//         hremail: "default@gmail.com",
//         gmcontact: "None",
//         gmphone: "347-452-9552",
//         gmemail: "gm@club.com",
//         distance: "6.7 miles",
//         notes: "This could be General Notes Section",
//         image: "https://farm3.staticflickr.com/2217/1711688729_10fd998b5d.jpg",
//         },
//         {
//         name: "Fort Lauderdale Country Club",
//         address: "415 E Country Club Cir, Fort Lauderdale, FL 33317",
//         hrcontact: "Harry Smith",
//         hrphone: "347-666-1234",
//         hremail: "default@gmail.com",
//         gmcontact: "Anthony Mandatta",
//         gmphone: "347-452-9552",
//         gmemail: "gmmanaer@club.com",
//         distance: "12.7 miles",
//         notes: "This could be General Notes Section Some more Notes",
//         image: "https://farm3.staticflickr.com/2217/1711688729_10fd998b5d.jpg"
            
//         },
//         {
//         name: "Bonaventure Country Club",
//         address: "3201 W Rolling Hills Cir, Fort Lauderdale, FL 33328",
//         hrcontact: "Joey Bianchi",
//         hrphone: "342-234-1234",
//         hremail: "defaulthr@gmail.com",
//         gmcontact: "Tony Montana",
//         gmphone: "347-898-0987",
//         gmemail: "gmmanager@club.com",
//         distance: "17.7 miles",
//         notes: "This could be General Notes Section Some more Notes",
//         image: "https://farm9.staticflickr.com/8536/8778590094_60024e6423.jpg"
//         },
//         {
//         name: "Another Country Club",
//         address: "324 Ocena Ave, Delray Beach, FL 33308",
//         hrcontact: "Joey Jesus",
//         hrphone: "(954) 456-9087",
//         hremail: "joey@gmail.com",
//         gmcontact: "None",
//         gmphone: "347-452-9552",
//         gmemail: "gm@club.com",
//         distance: "9.7 miles",
//         notes: "This could be General Notes Section",
//         image: "https://farm1.staticflickr.com/63/187187176_73d89267be.jpg"
//         },
//         ]
