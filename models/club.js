var mongoose = require('mongoose');

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
    image: String,
    author: {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,//OBJ ID REF----------
            ref: "Comment"//REF TO COMMENT MODEL-----------------------
        }
        ]
});

module.exports = mongoose.model("Club", clubSchema);