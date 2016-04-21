var monggose = require('mongoose');
var Comment = require('./models/comment');
var Club = require('./models/club');

var data = [
        {
        name: "Coral Ridge Country Club",
        address: "3801 Bayview Dr., Fort Lauderdale, FL 33308",
        hrcontact: "John Smith",
        hrphone: "(954) 449-0399",
        hremail: "default@gmail.com",
        gmcontact: "None",
        gmphone: "347-452-9552",
        gmemail: "gm@club.com",
        distance: "6.7 miles",
        notes: "This could be General Notes Section",
        image: "https://farm1.staticflickr.com/63/187187176_73d89267be.jpg",
        },
        {
        name: "Fort Lauderdale Country Club",
        address: "415 E Country Club Cir, Fort Lauderdale, FL 33317",
        hrcontact: "Harry Smith",
        hrphone: "347-666-1234",
        hremail: "default@gmail.com",
        gmcontact: "Anthony Mandatta",
        gmphone: "347-452-9552",
        gmemail: "gmmanaer@club.com",
        distance: "12.7 miles",
        notes: "This could be General Notes Section Some more Notes",
        image: "https://farm1.staticflickr.com/63/187187176_73d89267be.jpg"
        },
        {
        name: "Bonaventure Country Club",
        address: "3201 W Rolling Hills Cir, Fort Lauderdale, FL 33328",
        hrcontact: "Joey Bianchi",
        hrphone: "342-234-1234",
        hremail: "defaulthr@gmail.com",
        gmcontact: "Tony Montana",
        gmphone: "347-898-0987",
        gmemail: "gmmanager@club.com",
        distance: "17.7 miles",
        notes: "This could be General Notes Section Some more Notes",
        image: "https://farm1.staticflickr.com/63/187187176_73d89267be.jpg"
        },
        {
        name: "Bushwood Country Club",
        address: "324 Ocena Ave, Delray Beach, FL 33308",
        hrcontact: "Joey Jesus",
        hrphone: "(954) 456-9087",
        hremail: "joey@gmail.com",
        gmcontact: "None",
        gmphone: "347-452-9552",
        gmemail: "gm@club.com",
        distance: "2.7 miles",
        notes: "This could be General Notes Section",
        image: "https://farm1.staticflickr.com/63/187187176_73d89267be.jpg"
        },
        ]

function seedDB() {
    //CLEAR THE COLLECTION---------------------
    Club.remove({}, function(err) {
    // if(err) {
    //     console.log('There was a problem');
    // }
    //     console.log('Removed Clubs');
    //     //ADD TO THE COLLECTION----------------
    //     data.forEach(function(seed) {
    //     Club.create(seed, function(err, club) {
    //       if(err) {
    //           console.log(err);
    //       } else {
    //           console.log('Added A Club');
    //           //CREATE COMMENT-----------------
    //           Comment.create(
    //               {
    //               text: "This is a test Comment",
    //               author: "Lemmy Killmeister"    
    //               }, function(err, comment) {
    //                   if(err) {
    //                       console.log(err);
    //                   } else {
    //                         club.comments.push(comment);
    //                         club.save();
    //                         console.log('Created New Comment');
    //                   }//ELSE END------------- 
    //               });//Comment.create END-----
    //       }//ELSE END-------------------------
    //     });//Club.create(seed)-----------------
    // });//DATA FOREACH END----------------------
    });//Club.remove({}) END-------------------
}//function seedDB END------------------------

module.exports = seedDB;
