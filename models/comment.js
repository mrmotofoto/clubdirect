var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
    text: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId, //OBJ ID REF----------
            ref: "User"//REF TO USER MODEL-----------------------
            },
        username: String
    }
    
 });


module.exports = mongoose.model("Comment", commentSchema);