const sgMail = require('@sendgrid/mail');
const express = require( "express" );
const bodyParser = require('body-parser')
const orm = require( './db/orm' );
require('dotenv').config();

const PORT = process.env.PORT || 8088;
const app = express();

// to serve static content from the 'html' directory
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.get( `/api/user/:userName`, async function( req, res ){

    const myUser = await orm.getUserData( req.params.userName );
    // console.log( 'myUser:', myUser );

    res.send( myUser );
} );

app.post( '/api/email', function( req, res ){
    console.log( `<< form data received: `, req.body );
    console.log(`sending message to ${req.body.to}`)
    console.log(`process.env: ${process.env}`)

    try{
        sgMail.send(req.body);
    } catch(err){
        console.log(`error sending email ${err}`);
    }
    // respond with something
    res.send( { message: `sent email to: ${req.body.to}` } );
})

app.post( '/api/createUser',  async function ( req, res ){
    const newUser = req.body;
    console.log('Received New User: ', newUser.firstName )
    const mongoResonse = await orm.saveUser( req.body );
    console.log( mongoResonse );
    res.send ( {message: 'user received! thx babe'})
});

app.post( '/api/updateUser', async function ( req, res ){
    const userInfo = req.body;
    console.log('Received user info: ', userInfo.firstName )
    const mongoResonse = await orm.updateUser( req.body );
    console.log( mongoResonse );
    res.send ( {message: 'user info received! thx babe'})
});

app.post( '/api/listDescription', async function ( req, res ){
    console.log('Receving list desctiption in server..', req.body);
    const mongoResonse = await orm.updateListing( req.body );
    console.log( 'sent list...');
    res.send();
})

app.post( '/api/checkCredentials', async function ( req, res ) {
    const email = req.body.email;
    const pass = req.body.password;
    console.log(`receiving sign in credentials: email- ${email}, password- ${pass}`);
    const mongoResponse = await orm.checkUserCredentials ( email, pass );
    console.log( 'response: ', mongoResponse );

    res.send(mongoResponse);
});

app.post( '/api/updateUserList', async function ( req, res ) {
    console.log(`object is`,req.body)

    const mongoResponse = await orm.updateUserListingArray(req.body);
     console.log( 'response: ', mongoResponse );
     
    res.send( mongoResponse );
});


app.post( '/api/createList', async function ( req, res ){
    console.log(req.body);
    const mongoResponse = await orm.saveList( req.body );
    console.log('saving the list', mongoResponse );

    res.send (mongoResponse)
});


app.listen( PORT, function(){
    console.log( `RUNNING, http://localhost:${PORT}` ); });

 