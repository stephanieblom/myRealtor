const mongoose = require('mongoose');
const bcrypt = require ( 'bcrypt' );

mongoose.connect(`mongodb://localhost:27017/${process.env.realtor_users}`, {useNewUrlParser: true, useUnifiedTopology: true,});
mongoose.set('useCreateIndex', true);

// include mongoose models (it will include each file in the models directory)
const db = require( './models/users.js' );

function saveUser( data ){

    const userData = {
        firstName :  data.firstName,
        lastName :  data.lastName,
        mobile : data.mobile,
        city : data.city,
        company : data.company,
        emailAddress :  data.email,
        userPassword :  data.password,
    }
    const dbUser = new db ( userData );
    return dbUser.save(  );

}
module.exports = {
    saveUser
}