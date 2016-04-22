var express = require('express');
var router = express.Router();
var Club = require("../models/club");
var Comment = require("../models/comment");


//SHOW ALL CLUBS----------------------------------------------------------------
router.get('/', function(req, res) {
    Club.find({}, function(err, data) {
       if(err) {
           console.log(err);
       } else {
            res.render('clubs/index', {clubs: data, currentUser: req.user});
       }
    });
});

//CREATE NEW CLUB---------------------------------------------------------------
router.post('/', isLoggedIn, function(req, res) {
    
    //DEFAULT ENTRIES IF FORM FIELDS LEFT BLANK---------------------------------
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
        
    var author = {
        id: req.user._id,
        username: req.user.username
    }
        
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
        image:image,
        author: author
    }
    // console.log(req.user);
    
    Club.create(newClub, function(err, data) {
      if(err) {
          console.log(err);
      }  else {
          console.log(data);
          res.redirect('/clubs');
         }
    }); 
}); //app.post END------------------

//SHOW CREATE NEW CLUB FORM-----------------------------------------------------
router.get('/new', isLoggedIn, function(req, res) {
    res.render('clubs/new', {currentUser: req.user});
});

//SHOW ONE CLUB ----------------------------------------------------------------
router.get('/:id', function(req, res) {
    Club.findById(req.params.id).populate('comments').exec(function(err, data) {
        if(err) {
            console.log(err);
        } else {
            console.log(data);
            res.render("clubs/show", {club: data, currentUser: req.user});
        }
    });
});

//SHOW EDIT CLUB FORM-----------------------------------------------------------
router.get("/:id/edit", checkClubOwnerShip, function(req, res){
    Club.findById(req.params.id, function(err, foundClub) {
        if(err) {
            res.redirect("back");
        }
        res.render("clubs/edit", {club: foundClub, currentUser: req.user}); 
    });
});

//UPDATE CLUB-------------------------------------------------------------------
router.put("/:id", checkClubOwnerShip, function(req, res) {
   Club.findByIdAndUpdate(req.params.id, req.body.club, function(err, updated) {
     if(err) {
         res.redirect('/clubs');
     }  else {
         res.redirect('/clubs/' + req.params.id);
     }
   });
});

//DELETE CLUB-------------------------------------------------------------------
router.delete("/:id", checkClubOwnerShip, function(req, res) {
    Club.findByIdAndRemove(req.params.id, function(err) {
        if(err) {
            res.redirect("/clubs");
        } else {
            res.redirect("/clubs");
        }
    });
});


//MIDDLEWARE--------------------------------------------------------------------
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

function checkClubOwnerShip(req, res, next) {
     if(req.isAuthenticated()){
        Club.findById(req.params.id, function(err, foundClub) {
           if(err) {
               res.redirect("back");
           } else {
                if(foundClub.author.id.equals(req.user._id)) {
                     next(); 
                } else {
                     res.redirect("back");
                }
           } 
        });
    } else {
        res.redirect("back");
    }    
}

module.exports = router;