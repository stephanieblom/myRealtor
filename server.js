const sgMail = require('@sendgrid/mail');
const express = require( "express" );
const bodyParser = require('body-parser')
const orm = require( './db/orm' );

const PORT = process.env.PORT || 8080;
const app = express();

// to serve static content from the 'html' directory
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.post( '/api/email', function( req, res ){
    console.log( `<< form data received: `, req.body );
    console.log(`sending message to ${req.body.to}`)

    sgMail.send(req.body);
    // respond with something
    res.send( { message: `sent email to: ${req.body.to}` } );
})

app.post( '/api/createUser', async function ( req, res ){
    const newUser = req.body;
    console.log('Received New User: ', newUser.firstName )
    const mongoResonse = await orm.saveUser( req.body );
    console.log( mongoResonse );
    res.send ( {message: 'user received! thx babe'})
});

app.post( '/api/checkCredentials', async function ( req, res ) {
    const email = req.body.email;
    const pass = req.body.password;
    console.log(`receiving sign in credentials: email- ${email}, password- ${pass}`);
    const mongoResponse = await orm.checkUserCredentials ( email, pass );
    await console.log( 'response: ', mongoResponse );
    res.send( mongoResponse );
})

app.listen( PORT, function(){
    console.log( `RUNNING, http://localhost:${PORT}` );

 });
