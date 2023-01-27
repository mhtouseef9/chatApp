var mongoose=require('mongoose');
var User = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {type: String, unique: true},
    passwordHash: {type: String},
    isConfirmed: Boolean
});
module.exports = mongoose.model('users', User);
