const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let lists = new Schema ({
   address :  { type: String, trim: true, required: true},
   photo :  { type: String, trim: true, required: true },
   propType : { type: String },
   price : { type: String, trim: true },
   beds : { type: Number, trim: true },
   baths :  { type: Number, required: true, trim: true } 
} );

module.exports = mongoose.model('lists', lists);