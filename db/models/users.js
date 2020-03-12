const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let users = new Schema ({
   firstName :  { type: String, trim: true, required: true, },
   lastName :  { type: String, trim: true, required: true, },
   mobile : { type: String, trim: true },
   city : { type: String, trim: true },
   company : { type: String, trim: true },
   emailAddress :  { type: String, required: true, trim: true, unique: true, },
   userPassword :  { type: String, required: true, trim: true },
   // favourites: [{
   //    thumbId: mongoose.Types.ObjectId,
//    //    favouriteTime: {type: Date, default: Date.now} }]
//    listings: [ mongoose.Types.ObjectId ]
} );

module.exports = mongoose.model('users', users);