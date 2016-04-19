var express = require('express');
var app = express();

app.set('view engine', 'ejs');


app.get('/', function(req, res) {
   res.render('landing'); 
});

  var clubs = [
        {
        name: "Coral Ridge Country Club",
        address: "3801 Bayview Dr., Fort Lauderdale, FL 33308",
        hrContact: "John Smith",
        hrPhone: "(954) 449-0399",
        hrEmail: "default@gmail.com",
        GmContact: "None",
        GmPhone: "347-452-9552",
        GmEmail: "gm@club.com",
        distance: "6.7 miles",
        notes: "This could be General Notes Section",
        image: "https://farm3.staticflickr.com/2217/1711688729_10fd998b5d.jpg",
        },
        {
        name: "Fort Lauderdale Country Club",
        address: "415 E Country Club Cir, Fort Lauderdale, FL 33317",
        hrContact: "Harry Smith",
        hrPhone: "347-666-1234",
        hrEmail: "default@gmail.com",
        GmContact: "Anthony Mandatta",
        GmPhone: "347-452-9552",
        GmEmail: "gmmanaer@club.com",
        distance: "12.7 miles",
        notes: "This could be General Notes Section Some more Notes",
        image: "https://farm3.staticflickr.com/2217/1711688729_10fd998b5d.jpg"
            
        },
        {
        name: "Bonaventure Country Club",
        address: "3201 W Rolling Hills Cir, Fort Lauderdale, FL 33328",
        hrContact: "Joey Bianchi",
        hrPhone: "342-234-1234",
        hrEmail: "defaulthr@gmail.com",
        GmContact: "Tony Montana",
        GmPhone: "347-898-0987",
        GmEmail: "gmmanager@club.com",
        distance: "17.7 miles",
        notes: "This could be General Notes Section Some more Notes",
        image: "https://farm9.staticflickr.com/8536/8778590094_60024e6423.jpg"
        },
        {
        name: "Another Country Club",
        address: "324 Ocena Ave, Delray Beach, FL 33308",
        hrContact: "Joey Jesus",
        hrPhone: "(954) 456-9087",
        hrEmail: "joey@gmail.com",
        GmContact: "None",
        GmPhone: "347-452-9552",
        GmEmail: "gm@club.com",
        distance: "9.7 miles",
        notes: "This could be General Notes Section",
        image: "https://farm1.staticflickr.com/63/187187176_73d89267be.jpg",
        },
        ]

app.get('/clubs', function(req, res) {
        res.render('clubs', {clubs: clubs});
});

app.get('/show', function(req, res) {
   res.render('show', {clubs: clubs}); 
});


app.listen(process.env.PORT, process.env.IP, function(){
   console.log('Server Is Running'); 
});