var express = require('express');
var router = express.Router({mergeParams: true});
var Comment = require("../models/comment");
var Club = require("../models/club");

//==============================================================================
//    ****CREATE NEW COMMENT FORM IS ON THE SHOW PAGE*******
//==============================================================================

//SHOW CREATE NEW COMMENT FORM------------------------
// //
// router.get('/new', function(req, res) {
//     Club.findById(req.params.id, function(err, club) {
//         if(err) {
//             console.log(err);
//         } else {
//             res.render("comments/new", {club: club});
//         }
//     });
// });


//CREATE NEW COMMENT------------------------------------------------------------
router.post('/', isLoggedIn, function(req, res) {
    Club.findById(req.params.id, function(err, club) {
        if(err) {
            console.log(err);
            res.redirect('/clubs');
        } else {
            Comment.create(req.body.comment, function(err, comment) {
                if(err) {
                    console.log(err);
                } else {
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    club.comments.push(comment);
                    club.save();
                    console.log(comment);
                    res.redirect('/clubs/' + club._id);
                }
            });
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

module.exports = router;