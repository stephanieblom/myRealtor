const mongoose = require('mongoose');
const bcrypt = require ( 'bcrypt' );

mongoose.connect(`mongodb://localhost:27017/undefined`, {useNewUrlParser: true, useUnifiedTopology: true,});
mongoose.set('useCreateIndex', true);

// include mongoose models (it will include each file in the models directory)
const user = require( './models/users.js' );
const list= require( './models/lists.js' );

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
    const dbUser = new user ( userData );
    return dbUser.save(  );
}
function saveList(data){
    const ListInfo = {
        address :  data.address,
        photo :  data.photo,
        propType : data.propType,
        price : data.price,
        beds :  data.beds,
        baths :  data.baths,
    }
    const dbList = new list ( ListInfo );
    return dbList.save(  );
}
async function checkUserCredentials ( Email, password ){
    console.log( Email );
    const emailCheck =  await user.findOne({emailAddress: Email}, function(err, data){
        if(err){
          return ('err');
        }
        return (data);
      });
    // console.log( checkEmail );
    return emailCheck
}
async function updateUserListingArray(obj){
 
    console.log(`actual address`,obj)
    const pushListsArray = await user.updateOne({_id:`${obj.userId}`}, { $push: { listings: mongoose.Types.ObjectId(obj.listId) } });
    return pushListsArray
    

function getUserData ( userName ){
    const getUser = dbU.findOne({ emailAddress: { $regex: userName } });
    return getUser;
}
function updateUserBio ( user, data ){
    const updateUser = bdU.findOne( {email: user}, {$set:{bio: data }}, {} )
}
module.exports = {
    saveUser,
    saveList,
    checkUserCredentials,
    updateUserListingArray,
    getUserData,
    updateUserBio
}

