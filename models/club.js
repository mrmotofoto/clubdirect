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
    image: String  
});

module.exports = mongoose.model("Club", clubSchema);