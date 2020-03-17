const mongoose = require('mongoose');
const bcrypt = require ( 'bcrypt' );
require('dotenv').config()

mongoose.connect( process.env.MONGODB_URI || 'mongodb://localhost:27017/undefined', {useNewUrlParser: true, useUnifiedTopology: true,});
mongoose.set('useCreateIndex', true);

// include mongoose models (it will include each file in the models directory)
const user = require( './models/users.js' );
const list = require( './models/lists.js' );

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

 async function updateUser( data ){

    const userData = {
        firstName :  data.firstName,
        lastName :  data.lastName,
        mobile : data.mobile,
        city : data.city,
        company : data.company,
        bio : data.bio
    }
        console.log( 'email in orm: ', data.emailAddress );

    const updateUser =  await user.updateMany({ emailAddress : data.emailAddress }, {$set : userData }, );
        console.log( 'updated user :/');
}
async function updateListing( data ){

        console.log('[orm] Data id: ', data.id );
        console.log('[orm] data description: ', data.description );

    const description = {
        description : data.description,
    };

    const updateListing = await list.updateOne({ _id : String(data.id) }, { $set : description } );
}

function saveList(data){
    console.log( data );

    const ListInfo = {
        address :  data.address,
        photo :  data.photo,
        propType : data.propType,
        price : data.price,
        beds :  data.beds,
        baths :  data.baths,
        description : ''
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
    return emailCheck
}

async function updateUserListingArray(obj){
    console.log(`actual address`,obj)

    const pushListId = mongoose.Types.ObjectId(obj.listId);
        console.log( '[Pushing into user listing id: ]', pushListId );

    const pushListsArray = await user.updateOne({_id:`${obj.userId}`}, { $push: { listings: pushListId } });

    return pushListsArray
}

async function getUserData ( userName ){
    const getUser = await user.findOne({ emailAddress: { $regex: userName } }).populate("listings");

    return getUser;
}

function updateUserBio ( Email , data ){
    const updateUser = user.findOne( {email: Email}, {$set:{bio: data }}, {} )
}

module.exports = {
    saveUser,
    updateUser,
    updateListing,
    saveList,
    checkUserCredentials,
    updateUserListingArray,
    getUserData,
    updateUserBio,
}

