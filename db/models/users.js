const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const lists= require( './lists' );

let users = new Schema ({
   firstName :  { type: String, trim: true, required: true, },
   lastName :  { type: String, trim: true, required: true, },
   mobile : { type: String, trim: true },
   city : { type: String, trim: true },
   company : { type: String, trim: true },
   emailAddress :  { type: String, required: true, trim: true, unique: true, },
   userPassword :  { type: String, required: true, trim: true },
   listings :{type: mongoose.Schema.Types.ObjectId, ref: 'lists'}
} );

module.exports = mongoose.model('users', users);